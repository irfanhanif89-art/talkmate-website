// FoodFOMO — dead-link checker.
//
// Resolves whether each active viral_spot's source video is still a live, public
// post on TikTok / Instagram. Flags only: never hard-deletes. A spot is marked
// dead (and deactivated) only after TWO consecutive *confident* failures, so a
// single bad network day can never take real content off the feed.
//
// Three layers of protection against false positives:
//   1. Ambiguity (network error, rate limit, login wall, unrecognised page) is
//      always "unchecked", never "dead".
//   2. Instagram needs two independent surfaces to agree before it counts as a
//      failure at all.
//   3. A circuit breaker demotes every failure in a run if an implausible share
//      of one platform's checks fail at once — that is a broken detector, not a
//      mass deletion by the platform.
//
// Auth: x-cron-secret header matching public.link_checker_config, or
//       Authorization: Bearer <service role key>.
//
// POST body (all optional):
//   { mode: "check" | "probe",
//     platform: "all" | "tiktok" | "instagram",
//     limit: number,
//     dry_run: boolean,      // check everything, write nothing
//     trigger_source: string,
//     urls: string[] }       // probe mode only

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

/** Mark dead only after this many consecutive confident failures. */
const STRIKES_TO_DEAD = 2;
/** Concurrent outbound checks. Kept low so neither platform rate-limits us. */
const CONCURRENCY = 4;
/** Per-request timeout for a single platform check. */
const FETCH_TIMEOUT_MS = 12_000;
/** Bail out cleanly before the platform kills the invocation. */
const MAX_RUN_MS = 110_000;
/** Base pause between checks on the same worker, plus jitter. */
const THROTTLE_MS = 250;
/**
 * Circuit breaker. If more than this share of one platform's checks come back
 * failed in a single run, assume the detector broke rather than that the
 * platform deleted that much content, and demote every failure to unchecked.
 */
const BREAKER_FAIL_RATIO = 0.4;
const BREAKER_MIN_FAILS = 6;

/** Instagram serves a server-rendered embed to crawler UAs, a JS shell to browsers. */
const IG_CRAWLER_UA =
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";
const IG_BOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const TIKTOK_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

type Verdict = "live" | "dead" | "unchecked";
interface CheckResult {
  verdict: Verdict;
  reason: string;
  http_status?: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const jitter = () => THROTTLE_MS + Math.floor(Math.random() * THROTTLE_MS);

async function timedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: ctl.signal,
      redirect: "follow",
      headers: { "accept-language": "en-AU,en;q=0.9", ...(init.headers ?? {}) },
    });
  } finally {
    clearTimeout(t);
  }
}

/**
 * Retry only on transient signals (429 / 5xx / network). A 404 is an answer,
 * not a failure, so it comes straight back.
 */
async function fetchWithBackoff(url: string, init?: RequestInit): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await sleep(500 * 2 ** attempt + Math.floor(Math.random() * 400));
    try {
      const res = await timedFetch(url, init);
      if (res.status === 429 || res.status >= 500) {
        lastErr = new Error(`http_${res.status}`);
        await res.body?.cancel();
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("unknown_fetch_error");
}

// ---------------------------------------------------------------- TikTok ----

/**
 * oEmbed is far more automation-tolerant than the page HTML: 200 + JSON for a
 * live video, a hard error for a removed one.
 */
async function checkTikTok(videoUrl: string): Promise<CheckResult> {
  const endpoint = `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`;
  let res: Response;
  try {
    res = await fetchWithBackoff(endpoint, {
      headers: { accept: "application/json", "user-agent": TIKTOK_UA },
    });
  } catch (e) {
    return { verdict: "unchecked", reason: `network_error:${(e as Error).message ?? e}` };
  }

  const status = res.status;
  const body = await res.text().catch(() => "");

  if (status === 404 || status === 410) {
    return { verdict: "dead", reason: "tiktok_oembed_404", http_status: status };
  }

  if (status === 200) {
    let json: Record<string, unknown>;
    try {
      json = JSON.parse(body);
    } catch {
      return { verdict: "unchecked", reason: "tiktok_oembed_unparseable", http_status: status };
    }
    // A healthy oEmbed payload always carries embed html + a thumbnail.
    if (json.html || json.thumbnail_url) {
      return { verdict: "live", reason: "tiktok_oembed_ok", http_status: status };
    }
    const code = json.status_code;
    if (typeof code === "number" && code !== 0) {
      return { verdict: "dead", reason: `tiktok_oembed_status_${code}`, http_status: status };
    }
    return { verdict: "unchecked", reason: "tiktok_oembed_empty", http_status: status };
  }

  // Verified against a known-bad id: oEmbed answers 400 {"code":400} for a
  // well-formed URL it can no longer resolve.
  if (status === 400 && /tiktok\.com\/@[^/]+\/(video|photo)\/\d+/.test(videoUrl)) {
    return { verdict: "dead", reason: "tiktok_oembed_400_unresolvable", http_status: status };
  }

  // 403 is a bot block, not a verdict on the video.
  return { verdict: "unchecked", reason: `tiktok_http_${status}`, http_status: status };
}

// ------------------------------------------------------------- Instagram ----

/**
 * Present only once the embed has actually resolved a post. Verified: a live
 * post's crawler-rendered embed is ~140KB and carries these; a gone post's is
 * ~83KB and carries none of them. Matched unquoted — the markers sit inside a
 * JSON blob where the quotes are backslash-escaped.
 */
const IG_MEDIA_MARKERS = ["shortcode_media", "profile_pic_url", "is_video"];
/** Proof the page server-rendered at all, rather than a block page or JS shell. */
const IG_RENDERED_MARKER = "contextJSON";
/** Second, independent surface: crawler og: tags on the permalink. */
const IG_OG_MARKERS = ['property="og:image"', 'property="og:title"'];

function instagramShortcode(videoUrl: string): { kind: string; code: string } | null {
  const m = videoUrl.match(/instagram\.com\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  return { kind: m[1] === "reels" ? "reel" : m[1], code: m[2] };
}

/**
 * Second opinion, only ever asked for a post the embed surface already thinks is
 * gone. Verified against controls: a post that still exists renders og: tags to
 * a crawler even when its embed comes back empty (embedding disabled — the post
 * is fine, it just will not render inline). A post that is truly gone renders no
 * og: tags on either surface. Only that second case counts as a failure.
 */
async function confirmInstagram(kind: string, code: string): Promise<CheckResult> {
  const permalink = `https://www.instagram.com/${kind}/${code}/`;
  let res: Response;
  try {
    res = await fetchWithBackoff(permalink, {
      headers: { "user-agent": IG_BOT_UA, accept: "text/html,application/xhtml+xml" },
    });
  } catch (e) {
    return { verdict: "unchecked", reason: `instagram_confirm_network:${(e as Error).message ?? e}` };
  }

  const status = res.status;
  const html = await res.text().catch(() => "");

  if (status === 404 || status === 410) {
    return { verdict: "dead", reason: "instagram_confirmed_404", http_status: status };
  }
  if (status !== 200) {
    return { verdict: "unchecked", reason: `instagram_confirm_http_${status}`, http_status: status };
  }
  if (IG_OG_MARKERS.some((m) => html.includes(m))) {
    // The post is still there; only its embed is unavailable. Live, but worth
    // surfacing separately — these are the cards that will not play inline.
    return { verdict: "live", reason: "instagram_live_not_embeddable", http_status: status };
  }
  return { verdict: "dead", reason: "instagram_confirmed_no_media", http_status: status };
}

/**
 * oEmbed now needs an app token, so we read the embed page with a crawler UA,
 * which Instagram still server-renders. Absence of media is only ever a
 * *candidate* failure — it has to survive confirmInstagram to count.
 */
async function checkInstagram(videoUrl: string): Promise<CheckResult> {
  const parsed = instagramShortcode(videoUrl);
  if (!parsed) {
    return { verdict: "unchecked", reason: "instagram_url_unparseable" };
  }
  const endpoint = `https://www.instagram.com/${parsed.kind}/${parsed.code}/embed/captioned/`;

  let res: Response;
  try {
    res = await fetchWithBackoff(endpoint, {
      headers: { "user-agent": IG_CRAWLER_UA, accept: "text/html,application/xhtml+xml" },
    });
  } catch (e) {
    return { verdict: "unchecked", reason: `network_error:${(e as Error).message ?? e}` };
  }

  const status = res.status;
  const html = await res.text().catch(() => "");

  if (status === 404 || status === 410) {
    return { verdict: "dead", reason: "instagram_embed_404", http_status: status };
  }
  if (status !== 200) {
    return { verdict: "unchecked", reason: `instagram_http_${status}`, http_status: status };
  }
  if (IG_MEDIA_MARKERS.some((m) => html.includes(m))) {
    return { verdict: "live", reason: "instagram_embed_ok", http_status: status };
  }
  if (!html.includes(IG_RENDERED_MARKER)) {
    // Blocked, throttled, or Instagram changed the shell. Not evidence of death.
    return { verdict: "unchecked", reason: "instagram_embed_not_rendered", http_status: status };
  }

  await sleep(jitter());
  return await confirmInstagram(parsed.kind, parsed.code);
}

async function checkSpot(platform: string, videoUrl: string): Promise<CheckResult> {
  if (platform === "tiktok") return await checkTikTok(videoUrl);
  if (platform === "instagram") return await checkInstagram(videoUrl);
  return { verdict: "unchecked", reason: `unsupported_platform:${platform}` };
}

// ------------------------------------------------------------------- auth ---

async function authorise(req: Request, db: ReturnType<typeof createClient>): Promise<boolean> {
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (bearer && bearer === SERVICE_ROLE_KEY) return true;

  const supplied = req.headers.get("x-cron-secret");
  if (!supplied) return false;
  const { data } = await db
    .from("link_checker_config")
    .select("value")
    .eq("key", "cron_secret")
    .maybeSingle();
  const expected = (data as { value?: string } | null)?.value;
  if (!expected || expected.length !== supplied.length) return false;
  // Constant-time compare.
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ supplied.charCodeAt(i);
  return diff === 0;
}

// ------------------------------------------------------------------- main ---

interface Spot {
  id: string;
  platform: string;
  video_url: string;
  extracted_name: string | null;
  creator_handle: string | null;
  views: number | null;
  link_status: string;
  link_fail_count: number;
}

Deno.serve(async (req: Request) => {
  const startedAt = Date.now();
  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  if (!(await authorise(req, db))) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const body = await req.json().catch(() => ({})) as Record<string, unknown>;

  if (body.mode === "probe") {
    const urls = (body.urls as string[]) ?? [];
    const out = [];
    for (const url of urls) {
      const platform = url.includes("tiktok.com") ? "tiktok" : "instagram";
      out.push({ url, platform, result: await checkSpot(platform, url) });
      await sleep(jitter());
    }
    return new Response(JSON.stringify(out, null, 2), {
      headers: { "content-type": "application/json" },
    });
  }

  const platform = (body.platform as string) ?? "all";
  const limit = Math.min(Number(body.limit ?? 500), 500);
  const dryRun = body.dry_run === true;
  const triggerSource = (body.trigger_source as string) ?? "manual";

  // Only live spots are worth calls; oldest-checked first so a truncated run
  // picks up where the last one stopped.
  let query = db
    .from("viral_spots")
    .select(
      "id, platform, video_url, extracted_name, creator_handle, views, link_status, link_fail_count",
    )
    .eq("is_active", true)
    .order("link_checked_at", { ascending: true, nullsFirst: true })
    .limit(limit);
  if (platform !== "all") query = query.eq("platform", platform);

  const { data: spots, error: selectError } = await query;
  if (selectError) {
    return new Response(JSON.stringify({ error: selectError.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // ---- Phase 1: check everything, write nothing. The circuit breaker needs
  // the whole picture before any row is allowed to change.
  const queue = [...((spots ?? []) as unknown as Spot[])];
  const results: { spot: Spot; result: CheckResult }[] = [];
  let truncated = false;

  async function worker() {
    while (true) {
      if (Date.now() - startedAt > MAX_RUN_MS) {
        truncated = true;
        return;
      }
      const spot = queue.shift();
      if (!spot) return;
      results.push({ spot, result: await checkSpot(spot.platform, spot.video_url) });
      await sleep(jitter());
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // ---- Phase 2: circuit breaker, per platform.
  const breaker: Record<string, { checked: number; failed: number; tripped: boolean }> = {};
  for (const { spot, result } of results) {
    const b = breaker[spot.platform] ??= { checked: 0, failed: 0, tripped: false };
    b.checked++;
    if (result.verdict === "dead") b.failed++;
  }
  for (const b of Object.values(breaker)) {
    b.tripped = b.failed >= BREAKER_MIN_FAILS && b.failed / b.checked > BREAKER_FAIL_RATIO;
  }
  for (const r of results) {
    if (r.result.verdict === "dead" && breaker[r.spot.platform].tripped) {
      r.result = {
        verdict: "unchecked",
        reason: `circuit_breaker_tripped:${r.result.reason}`,
        http_status: r.result.http_status,
      };
    }
  }

  // ---- Phase 3: apply.
  const { data: runRow } = await db
    .from("link_check_runs")
    .insert({
      // The row is written after the checks finish, so stamp the real start.
      started_at: new Date(startedAt).toISOString(),
      trigger_source: triggerSource,
      platform_filter: platform === "all" ? null : platform,
    })
    .select("id")
    .single();
  const runId = (runRow as { id?: string } | null)?.id ?? null;

  const tally = {
    checked: 0,
    live: 0,
    failed: 0,
    newly_dead: 0,
    unchecked: 0,
    live_not_embeddable: 0,
  };
  const failures: Record<string, unknown>[] = [];
  const errors: Record<string, unknown>[] = [];
  const checkedAt = new Date().toISOString();

  for (const { spot, result } of results) {
    tally.checked++;
    const patch: Record<string, unknown> = {
      link_checked_at: checkedAt,
      link_last_reason: result.reason,
    };

    if (result.verdict === "live") {
      tally.live++;
      patch.link_status = "live";
      patch.link_fail_count = 0;
      // Keep the reason only when it carries a caveat worth reviewing.
      const notEmbeddable = result.reason === "instagram_live_not_embeddable";
      if (notEmbeddable) tally.live_not_embeddable++;
      patch.link_last_reason = notEmbeddable ? result.reason : null;
    } else if (result.verdict === "dead") {
      tally.failed++;
      const strikes = (spot.link_fail_count ?? 0) + 1;
      patch.link_fail_count = strikes;
      if (strikes >= STRIKES_TO_DEAD) {
        tally.newly_dead++;
        patch.link_status = "dead";
        patch.is_active = false;
      }
      failures.push({
        id: spot.id,
        extracted_name: spot.extracted_name,
        creator_handle: spot.creator_handle,
        views: spot.views,
        platform: spot.platform,
        video_url: spot.video_url,
        reason: result.reason,
        strikes,
        deactivated: strikes >= STRIKES_TO_DEAD && !dryRun,
      });
    } else {
      // Ambiguous: stamp that we looked, change nothing else.
      tally.unchecked++;
    }

    if (!dryRun) {
      const { error } = await db.from("viral_spots").update(patch).eq("id", spot.id);
      if (error) errors.push({ id: spot.id, error: error.message });
    }
  }

  if (runId) {
    await db
      .from("link_check_runs")
      .update({ finished_at: new Date().toISOString(), ...tally, errors })
      .eq("id", runId);
  }

  const summary = {
    run_id: runId,
    dry_run: dryRun,
    platform,
    truncated,
    duration_ms: Date.now() - startedAt,
    candidates: spots?.length ?? 0,
    ...tally,
    breaker,
    failures,
    write_errors: errors,
  };

  console.log(
    "link-check summary",
    JSON.stringify({ ...summary, failures: failures.length }),
  );

  return new Response(JSON.stringify(summary, null, 2), {
    headers: { "content-type": "application/json" },
  });
});
