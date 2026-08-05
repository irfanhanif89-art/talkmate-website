# C1 "The graveyard" — build sheet

Everything needed to produce the ad, written out and **not submitted**. Read the routing note
first; it changes what you thought this build was.

Sources: `ugc-saas-flow` SKILL.md + `references/saas-clip-prompt.md`,
`references/saas-ugc-character.md`, `references/ugc-character.md`, read from the Higgsfield MCP
server 2026-08-05.

---

## 0. Routing note — C1 is NOT the eight-slot board build

`ugc-saas-flow` is a **different architecture** from `ugc-flow`. There are **no storyboards, no
slots and no internal hard cuts**. The creator image seeds Seedance directly and the whole clip
is **ONE continuous talking-head take**. The app never appears inside the generation — it is
composited afterwards as real screenshot cards floating over the creator's face.

So everything in `higgsfield-prompt-language.md` §3–§4 (the 8-slot board, the anti-morph cadence,
the seven `Hard cut to.` markers) **does not apply to C1**. It applies to C2, C3 and C4, which
run through `ugc-flow`. Mixing the two flows' reference files is explicitly forbidden.

Practical consequence: **C1 is the cheapest of the five to generate** (one image + one de-slop +
one video) but the most work to assemble, because the screenshot overlay and captions are ffmpeg
steps in a sandbox.

---

## 1. The decision Irfan needs to make first

`ugc-saas-flow` captures the site at a URL with Playwright and turns sections into cards. For
FoodFOMO that would capture **`foodfomo.vercel.app`** — the *web* pages, not the iOS app.

**Recommendation: don't capture the web app. Supply the five App Store screenshots instead.**

- The ad sells an iOS app. Showing web pages sets up an expectation the download doesn't match.
- The App Store screenshots are real captured pixels of the real product — exactly what the
  flow's "real screenshots, never AI-generated UI" rule is protecting.
- The flow already supports user-supplied screenshots as a first-class path.

Either way the hard rule holds: **never AI-generate the UI, never animate a screenshot.** A
generated "app screen" renders as gibberish text and is off-brand instantly.

---

## 2. The monologue — 35 words, locked

> "Four hundred food videos saved. Been to four. None of them tell you where the place even is.
> FoodFOMO puts the actual venue on the video — directions and all. It's free, on the App Store."

**Why it's exactly this length.** The flow's density rule for a 13–15s clip is **35–40 words,
hard ceiling ~40**, at 2.4–2.7 words/sec. Beyond that the render crams and the delivery races.
The version in `round-1-plan.md` was ~44 words — over the ceiling — so it has been trimmed here.

**Compliance check:**

| Rule | Status |
|---|---|
| Hook ≤8 words, no pointing opener | ✅ "Four hundred food videos saved. Been to four." = 8 |
| Banned first word | ✅ Opens on "Four" |
| First body beat names the site | ✅ "FoodFOMO puts the actual venue…" |
| Specificity law — a concrete per claim | ✅ 400 / four |
| No AI-tell phrases | ✅ no *obsessed / literally / game-changer / hits different* |
| No corporate filler | ✅ no *seamless / effortless / unlock* |
| Closer carries the product action | ✅ "It's free, on the App Store." |
| Brand honesty rules | ✅ No booking claim, no Android, no coverage claim |

---

## 3. Step 1 — the creator seed

```json
generate_image({ "params": {
  "model": "soul_2",
  "aspect_ratio": "3:4",
  "quality": "2k",
  "prompt": "<the string below>"
}})
```

> A young woman in her mid-20s, mid-thought with a slight half-smile, eyes glancing slightly off-lens, shoulder-length dark brown hair with a loose natural wave, slim athletic build, with high model facial features, symmetrical features, well-proportioned figure, natural skin texture, sitting on a low linen couch in a small sunlit apartment living room. Cool neutral daylight from a large window falls across her face from the left — clean, no warm cast, no retouched glow. Skin texture is real, with visible pores and natural unevenness. She wears an oversized cream cotton shirt, fully buttoned to the second-from-top button, top fully closed at the front, fabric meeting at the collarbone, classic high-coverage fit, over straight-leg indigo jeans, with a thin gold chain. Body in a calm neutral pose — relaxed, one hand resting naturally. The background features a sage-green wall, a rattan side table, a stack of books and a half-drawn linen curtain. Color palette dominated by cream, sage and warm wood neutrals. Casual handheld iPhone selfie taken by her at arm's length — head and shoulders fill the frame, slight natural tilt, slightly off-center, intuitive composition, captured mid-moment. Subject in clear focus with the background naturally falling out as in any phone photo. Self-portrait selfie shot on iPhone front-facing camera held by the subject at arm's length — head and shoulders fill the frame, casual handheld framing, slight natural tilt, slightly off-center, slightly imperfect, not posed. Phone-sensor grain and realistic skin texture preserved, no retouch, no smooth-skin filter. No fisheye lens, no ultra-wide distortion. Authentic UGC creator phone selfie, NOT editorial portrait, NOT fashion magazine.

**Why each part is there:**

- The four **beauty-floor anchors** are mandatory in every creator prompt: *high model facial
  features · symmetrical features · well-proportioned figure · natural skin texture*.
- The expression is taken from the **approved mid-action list**. `warm smile at the camera` is a
  hard ban — it renders as aware-of-camera stock footage.
- **Cool neutral daylight, never golden hour.** Warm/amber light is banned in the creator seed.
- The **closing block is verbatim** and non-negotiable — it's what keeps the render a phone
  selfie instead of an editorial portrait.
- **No product in the character image**, ever. The app is composited later.
- **Age band is legal here** (`in her mid-20s`) — the creator seed takes it from a variety pool.
  It is **banned in the clip prompt**, where the rules are age-blind. Don't copy it forward.
- Nationality is not stated. The rules say render by features; **the accent is set in the clip
  prompt, not the image** — a still can't hold a voice.

## Step 2 — de-slop the seed (MANDATORY)

1. `media_import_url` on the returned `character_url` → `creator_input_id`
   (Seedream's `image_references` role rejects a job-id chain reference).
2. `generate_image`, model **`seedream_v5_pro`**, `3:4`, `2k`,
   `medias: [{ value: creator_input_id, role: "image_references" }]`, using the **exact
   preservation prompt** from the `ugc-saas-flow` SKILL.md step 3.5 — do not paraphrase it.

The de-slopped output **overwrites** `character_media_id` and becomes the locked identity for
every clip in every concept. Soul holds identity but renders waxy skin; skipping this is what
makes an ad look AI-generated at a glance.

Moderation block → retry once on `seedream_v5_lite`, then continue rather than stalling.

---

## 4. Step 3 — the clip

```json
generate_video({ "params": {
  "model": "seedance_2_0",
  "aspect_ratio": "9:16",
  "resolution": "1080p",
  "duration": 15,
  "medias": [{ "value": "<character_media_id>", "role": "image_references" }],
  "prompt": "<the string below>"
}})
```

> The same woman from the character reference image, identical face, hair and clothing, sitting on the low linen couch in the same small sunlit apartment living room, her phone propped up in front of her against a stack of books, selfie-style. Vertical 9:16 medium shot framed from mid-torso up — she fills about two thirds of the frame, head centered in the frame both horizontally and vertically, no top headroom, eyeline straight into the lens. Hands stay clear of the bottom fifteen percent of the frame. Cool neutral window daylight from the left, natural phone-camera look, slight handheld imperfection. ONE continuous take, one framing, no cuts. She talks to camera with natural hand gestures and three small emphasis beats spread across the take — a short honest laugh landing under "been to four", a small shrug through the middle line, a lean-in on the last line. She speaks in a strong Australian accent — broad, warm, unmistakably Australian vowels — natural, lively spoken delivery with varied rhythm and emphasis, like a real creator talking to a friend, NOT a narrator, NOT a voiceover; quicker through the connective middle, slowing to land the final line. Near the end she reaches off-frame and picks up her own phone in one hand, its screen turned away from the lens and blank, gesturing lightly with it as she finishes. She speaks, verbatim: "Four hundred food videos saved. Been to four. None of them tell you where the place even is. FoodFOMO puts the actual venue on the video — directions and all. It's free, on the App Store." Audio recorded on the iPhone front camera — natural phone-mic tone, slightly close and compressed, with faint living-room ambience matching the shot, no background music; voice clear and up-front. No website, no web interface, no app UI, no screen, monitor, browser or rendered content on any phone or device screen anywhere in the shot. No on-screen text, no subtitles, no captions, no watermarks, no real brand logos anywhere, no neutral accent, no generic American voice, no British accent, no flat monotone delivery, no cinematic grade, no film grain, no bokeh, no lens flare, no slow motion, no beauty filter, no third arm, no extra hands, no duplicated limbs, no deformed hands.

### Why the awkward-looking bits are deliberate

- **"ONE continuous take… no cuts"** — this flow bans intra-clip cuts. The pre-submit check
  greps for `Hard cut`, `Cut 1`, `slot`, `board` and rejects the prompt if any appear.
- **"head centered… no top headroom"** — the screenshot card floats over the *upper face*, so
  the standard "leave headroom" instinct puts the head straight under the card.
- **"bottom fifteen percent"** — captions burn there.
- **The Bug-E ban** (`no website, no web interface, no app UI…`) is required in every clip.
  Video models render UI as gibberish; a generated app screen is always fake.
- **The phone is blank and turned away.** That is the sanctioned SaaS closer: she can act on a
  phone, but no rendered UI ever lives inside the clip.
- **"FoodFOMO" appears only in the spoken line, never in the visual description.** If a visual
  names a product with no real reference image, Seedance invents a fake one.
- **The accent block is the whole reason this ad works in Australia.** This flow defaults to a
  US accent; an origin mentioned as scene context does not trigger the accent machinery. The
  request is explicit, described in qualities rather than phonetic spelling, and never softened
  with "slight" — plus `no generic American voice` in the negative tail.
- At 15s, **N = 1**, so this single clip carries both the body and the closer. That is why the
  phone action is legal here — in a multi-clip build it would only be allowed in the last one.

---

## 5. Step 4 — composite the screenshot cards

Cards are anchored to **narrated word-time**: `t = T × cumulative_words / total_words`, with
T = 15s and total_words = 35. Each card sits ~1.2–1.5s with a ~0.3–0.5s clean-face gap, overlaid
contain-fit into `0.78W × ≤0.60H`, centred slightly up.

**No cards during the hook or the closer** — the hook needs a clean face to earn the watch, and
the closer needs one to land the CTA.

| Card | Anchor phrase | Cum. words | ≈ t | Show |
|---|---|---|---|---|
| — | *hook — no card* | 0–8 | 0–3.4s | clean face |
| 1 | "None of them tell you" | 9 | ~3.9s | Feed screen, cards stacked |
| 2 | "where the place even is" | 14 | ~6.0s | A spot card with the venue name visible |
| 3 | "puts the actual venue on the video" | 20 | ~8.6s | Spot detail — venue + hype score |
| 4 | "directions and all" | 27 | ~11.6s | Take Me There / map |
| — | *closer — no card* | 30–35 | 12.9–15s | clean face |

Captions are **on by default** in this flow (`caption_mode: "Both"` = bottom subtitles + top hook
plate). Unlike `ugc-flow`, text here is not opt-in.

---

## 6. Cost and QA

**Billable generations: three** — one `soul_2` image, one `seedream_v5_pro` de-slop, one
`seedance_2_0` video. The capture, composite and caption burn are sandbox/ffmpeg work, not
generations.

**The creator seed is a one-time cost across the whole round.** Steps 1–2 run once; C2, C3 and
C4 reuse the same `character_media_id`. Never regenerate it mid-run — a new face mid-campaign
resets the familiarity the round is trying to build.

Draft at `mode: "fast"` / 720p to check pacing, lip sync and — above all — **the accent**, before
paying for the `std` 1080p render.

**Frozen-frame QA before anyone sees it:** one creator only · ≤2 hands (count frame edges) ·
face matches the reference · no baked text · clean lips on mid-word frames · **no rendered UI on
any surface** · the phone screen blank or turned away.

Then `virality_predictor` on the final cut. Weak hook score → re-cut the hook. At 15s that means
re-rolling the clip, so it's worth being certain about the script first.

---

## 7. Still not submitted

Nothing here has been generated. To run it, the gates in `SKILL.md` step 0 have to pass — and
gates 1 and 2 (1.1.2 approval, the email/SMTP fix) are still open.
