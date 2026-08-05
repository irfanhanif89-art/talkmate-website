# Higgsfield production spec — FoodFOMO ads

How a concept becomes a finished 9:16 cut. Read after the concept table is approved,
not before.

---

## 1. Workflow routing

Higgsfield workflows are loaded with `get_workflow_instructions({ workflow: "<name>" })`.
**Always load the workflow before building** — never freehand a prompt when a workflow owns
the format.

| Concept shape | Workflow | Why |
|---|---|---|
| App is on screen — the payoff is visual (C1, C2 alt) | **`ugc-saas-flow`** | Built for a product at a URL: creator talks to camera while **real captured screenshots** pop in as overlay cards. Never a screen recording, never AI-generated UI — which is exactly right, because a hallucinated FoodFOMO interface in an ad is a lie about the product. |
| Creator talking, no UI (C2, C3, C4) | **`ugc-flow`** | The default talking-head creator review. |
| Food-led, voiceover only, no creator (C5) | **`ugc-product-flow`** | Product is the hero; a person appears only as hands/POV. |
| Step-by-step "how to find X" | **`ugc-tutorial-flow`** | Bakes "Step N" captions into frames. |
| Covers / thumbnails | **`youtube-thumbnail-generator`** | Owns thumbnail production. |

**Screenshots for `ugc-saas-flow`:** use real captures — the five dark App Store Connect
screenshots, or the live web spot pages at `foodfomo.vercel.app/<city>/spot/<id>`. Never let
the model invent the UI.

---

## 2. Non-negotiable output spec

| Setting | Value |
|---|---|
| Aspect ratio | **9:16**, 1080×1920 |
| Primary length | **15s** |
| Cutdown | **9s** version of every winner |
| Captions | **Burned in.** Most of the feed watches on mute. |
| Voice | **Australian.** Never US or neutral-international. |
| First frame | Never a logo, never a title card. A face or food, immediately. |
| Audio | Native-feeling. No stock corporate bed. |
| Look | Shot-on-phone. Hand-held. Slightly imperfect. Not graded. |

**Safe zones** — platform UI covers the edges. Keep captions and key visuals clear of roughly
the top 12% and bottom 25% of frame. A hook caption hidden behind the TikTok username is a
hook that didn't run.

---

## 3. Hook iteration — what's actually cheap

Barry Hott's hook-first principle says to make the hook swappable. **The Higgsfield pipeline
does not allow that at 15 seconds**: a ≤15s ad is ONE board and ONE Seedance clip with eight
internal hard cuts, so changing the hook means re-rolling the whole clip. There is no cheap
hook swap at this length — see `higgsfield-prompt-language.md` §8.

What *is* cheap: **the written monologue and the storyboard board**. Both are settled before any
video call, and the board is an image generation, not a video one. Get the hook right on paper,
confirm the staging in the board, and only then spend the video credit.

Name assets so the pairing is still obvious when you do re-roll:

```
FF_TT_C1_reelsaver_h1_15s_v1   ← hook 1 + body
FF_TT_C1_reelsaver_h2_15s_v1   ← hook 2 + same body
```

Naming convention: `FF_<platform>_<concept>_<persona>_<hook#>_<format>_v<n>`
(`TT` = TikTok, `IG` = Instagram). This is what makes analysis possible without paid
creative-analytics tooling — the filename carries the test dimensions.

---

## 4. Identity consistency

If a campaign needs the **same creator across multiple ads** — which builds familiarity and is
worth doing once a concept wins — train a Soul Character once with `higgsfield-soul-id` and
reuse the `reference_id`.

⚠️ The persona must be **fictional**, or Irfan/Jade with explicit consent. Synthetic media of
a real private individual is banned on TikTok even with a label.

---

## 5. Mandatory predictor gate

Every cut goes through **`virality_predictor`** before it goes near ad spend. It scores hook
strength, attention, retention risk and creative score.

- Weak hook score → **re-cut the hook**, don't ship it and hope.
- Weak retention → the middle is too slow; cut to the payoff sooner.
- A cut that fails twice → the *concept* may be wrong, not the execution. Say so.

Fixing a hook in Higgsfield costs credits. Fixing it in the auction costs credits **and**
media spend **and** the learning window.

---

## 6. Credit discipline

Current balance and plan: check with `balance` at the start of any production session and
report it before generating.

- **Generate one concept end-to-end first**, review it with Irfan, *then* batch the rest.
  Five wrong ads cost five times one wrong ad.
- Use `generate_video_batch` + `jobs_wait` only **after** the first cut is approved.
- Never regenerate a full video to change a caption or a hook — that's what the separated hook
  shot is for.

---

## 7. Publishing

- TikTok: `tiktok_connect` / `tiktok_prepare_publish` / `tiktok_publish` can post organically.
  **Paid** placement still runs through TikTok Ads Manager.
- App Store links require a **TikTok business account** — personal creator accounts cannot
  link to App Store pages.
- **Apply the AI-generated content disclosure label on every ad.** Required since 2026-07-21.
- Nothing publishes without Jade's or Irfan's explicit approval.
