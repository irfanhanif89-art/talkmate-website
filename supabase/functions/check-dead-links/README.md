# FoodFOMO — dead-link checker

Stops deleted / private / removed TikTok and Instagram posts from sitting live in
the feed. Runs daily against the active `viral_spots` and flags the ones whose
source video has gone.

**Supabase project:** `vxaotqpgbiqnhpsjcpxe`

## What it does

For every **active** spot it resolves whether `video_url` still points at a live,
public post, then writes one of three outcomes:

| Outcome | Effect |
|---|---|
| live | `link_status='live'`, `link_fail_count=0`, `link_checked_at` stamped |
| confident failure | `link_fail_count+1`; on reaching **2**, `link_status='dead'` and `is_active=false` |
| ambiguous | `link_checked_at` stamped, nothing else changed |

It never hard-deletes. Deactivated rows stay in the table for owner review and
history.

## Detection

**TikTok** — the oEmbed endpoint (`/oembed?url=…`). 200 + JSON carrying
`html`/`thumbnail_url` means live; 404/410, or a 400 on a well-formed
`/@user/video/<id>` URL, means gone. 403 is a bot block, not a verdict.

**Instagram** — oEmbed now needs an app token, so the checker reads the public
embed page with a crawler user-agent, which Instagram still server-renders
(a browser UA gets a ~608KB JavaScript shell that is identical for live and dead
posts, and is therefore useless). Measured against known-good and known-bad
shortcodes:

| | embed w/ crawler UA | permalink og: tags | verdict |
|---|---|---|---|
| live + embeddable | ~140KB, has `shortcode_media` | present | `live` |
| live, embedding off | ~83KB, no media | **present** | `live` (`instagram_live_not_embeddable`) |
| genuinely gone | ~83KB, no media | **absent** | `dead` |

Instagram therefore needs **two independent surfaces to agree** before a spot
counts as failed even once.

## Why a false positive is hard

1. Ambiguity — network error, timeout, 429, login wall, unrecognised page — is
   always `unchecked`, never `dead`.
2. Instagram requires the embed *and* the permalink to agree.
3. **Two-strike rule**: `dead` only after two consecutive confident failures, so
   one bad network day cannot deactivate real content.
4. **Circuit breaker**: if more than 40% of one platform's checks fail in a
   single run (minimum 6), every failure in that run is demoted to `unchecked`.
   That much content disappearing at once means the detector broke, not that the
   platform deleted it.

## Schedule

`pg_cron` job `daily-dead-link-check`, `0 17 * * *` UTC = **03:00 AEST**, calling
the function via `pg_net`. A full 222-spot pass measures ~52s, inside the
function's own 110s deadline, so one call covers the whole active set.

Over summer (AEDT) this lands at 04:00 local. Still off-peak, so the schedule
stays in UTC rather than chasing the offset.

## Auth

The function does its own auth and runs with `verify_jwt = false`:

- `x-cron-secret` matching `public.link_checker_config.cron_secret` (what pg_cron
  sends), compared in constant time; or
- `Authorization: Bearer <service role key>`.

`link_checker_config` has RLS enabled with no policies, so only the service role
can read it.

## Running it by hand

```sql
select net.http_post(
  url := 'https://vxaotqpgbiqnhpsjcpxe.supabase.co/functions/v1/check-dead-links',
  body := jsonb_build_object('platform','all','trigger_source','manual'),
  headers := jsonb_build_object(
    'content-type','application/json',
    'x-cron-secret', (select value from public.link_checker_config where key='cron_secret')),
  timeout_milliseconds := 180000
);
-- then, a minute later:
select status_code, content from net._http_response order by id desc limit 1;
```

Body options: `platform` (`all` | `tiktok` | `instagram`), `limit`, `dry_run`
(check everything, write nothing), `trigger_source`, and `mode: "probe"` with
`urls: [...]` to classify arbitrary URLs without touching the database.

## Reviewing what it found

```sql
-- Flagged, one strike in. Deactivates on its next consecutive failure.
select extracted_name, creator_handle, views, video_url, link_last_reason
from viral_spots where is_active and link_fail_count > 0 order by views desc;

-- Deactivated by the checker, pending the owner's purge decision.
select extracted_name, creator_handle, views, video_url
from viral_spots where link_status = 'dead' order by views desc;

-- Live but will not embed — the card opens fine, it just will not play inline.
select extracted_name, creator_handle, views, video_url
from viral_spots where link_last_reason = 'instagram_live_not_embeddable';

-- Per-run drift.
select * from link_check_runs order by started_at desc limit 14;
```

To restore something the checker got wrong:

```sql
update viral_spots
set is_active = true, link_status = 'unchecked', link_fail_count = 0, link_last_reason = null
where id = '<uuid>';
```

## Cost

Plain HTTP requests — no Claude / Anthropic API in the loop. The recurring run
costs nothing beyond Supabase's free scheduled-function usage.
