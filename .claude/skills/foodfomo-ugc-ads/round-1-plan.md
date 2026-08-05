# FoodFOMO — Round 1 ad plan

**Status: ready to execute, blocked on two owner gates.** Nothing has been generated.
Prepared 2026-08-05. Owner: Irfan. Approver for publish: Jade or Irfan.

---

## 1. What round 1 is actually for

**It is not for installs.** At this budget, installs are a bonus. Round 1 exists to answer one
question: **which of five ideas earns attention from an Australian iPhone user mid-scroll?**

Judge it on **hook rate** first, **hold rate** second, CTR third, downloads fourth. A round that
kills three concepts cleanly has done its job.

The reason to be strict about this: with five concepts and a small budget, install numbers per
concept will be too small to be statistically meaningful, but *hook rate* is readable at about a
thousand impressions. Optimising against the metric you can actually read is the whole trick.

---

## 2. Gates — where we stand

| # | Gate | Status |
|---|---|---|
| 1 | 1.1.2 approved and live | 🔴 **Blocked** — submitted 2026-08-05, in review. 1.1.0 is live and has a dead share button. |
| 2 | Email / custom SMTP fixed | 🔴 **Blocked** — password reset still on Supabase's test-grade mailer. |
| 3 | App Store campaign links created | ⚪ Not started — Irfan, 15 minutes in App Store Connect |
| 4 | Target cities fat enough | ✅ Melbourne 68, Sydney 62 |
| 5 | Rights clean | ✅ All creative generated; no scraped reels |
| 6 | AI disclosure handled | ✅ Planned — label applied at upload |
| 7 | Concepts approved | ⚪ Awaiting Irfan |

**Gates 1 and 2 are the only ones that block spend.** Everything in §3–§7 can be built while
they're open — that's the point of planning now.

---

## 3. Targeting

| | |
|---|---|
| Platforms | TikTok + Instagram Reels |
| Geo | **Australia** — Melbourne and Sydney metro |
| Device | **iOS only** |
| Age | **18+** (matches the App Store rating; not optional) |
| Objective | Traffic → App Store campaign link |
| Language | English |

Excluded deliberately: Canberra and Hobart (6 live spots each), Android, under-18s.

---

## 4. The five concepts

Each is a genuinely different *idea*, aimed at a different person, with a stated falsifier.
Scripts are ~40 words — the natural ceiling for 15 seconds — and are written to survive the
Higgsfield banned-phrase rules (no "obsessed", no "stop scrolling", no "game changer", no
banned first word).

---

### C1 — "The graveyard" · the reel-saver

**Insight:** everyone has hundreds of saved food videos and has visited almost none of them.
Nobody names this out loud, and it's the sharpest pain FoodFOMO actually solves.

**Script (~40 words):**
> "Four hundred food videos saved on this phone. I've been to four of them. Not because I'm
> lazy — because none of them tell you where the place actually is. This one puts the venue on
> the video. Free, on the App Store."

**Workflow:** `ugc-saas-flow` — the app has to be on screen; the payoff is visual.
**Falsifier:** strong hook, weak hold → the pain lands but the solution doesn't read.

---

### C2 — "Worth the queue" · the weekend planner

**Insight:** the brand's honesty spine as an ad. Every food app tells you what's good; this one
tells you what's overhyped.

**Script:**
> "That burger's got two million views and a forty-minute queue. Nobody in the comments tells
> you whether it's worth standing in it. This has people who actually went, saying straight up
> if it lived up. Saved me a Saturday."

**Workflow:** `ugc-flow` with app cutaways.
**Falsifier:** good hold, weak CTR → people enjoy the take but don't want an app for it.
**Guardrail:** never name a real venue negatively. The hyped example stays unidentifiable.

---

### C3 — "New here" · the new-in-town

**Insight:** moving cities is when food habits are genuinely up for grabs. High intent, clear
moment, constant inbound to both target cities.

**Script:**
> "Moved to Melbourne five weeks ago and ate at the same Vietnamese place four times, because I
> didn't know where else to go. Picked my city in this, and there's sixty-odd spots people are
> queuing for. Been to three this week."

**Workflow:** `ugc-flow`.
**Falsifier:** works in Melbourne, dies in Sydney → it's a city-fit story, not a concept.
**Note:** "sixty-odd" is accurate (68 live Melbourne spots). Swap the number for the Sydney cut.

---

### C4 — "The 8pm argument" · the group decider

**Insight:** "Where do you want to eat?" "I don't mind." The most recognisable food conversation
there is, and a real moment of decision paralysis.

**Script:**
> "Where do you want to eat? I don't mind. Okay, where? I don't mind. Twenty-five minutes of
> that every Friday, and we end up at the same pub. Now she picks off the feed and I drive.
> Nine seconds."

**Workflow:** `ugc-flow` — performance-led, the comedy carries it.
**Falsifier:** high hook, high hold, no installs → entertaining, not persuasive. The ad became
the product.

---

### C5 — "Food-first" · the control

**Insight:** the control concept. No story, no creator — just food, hard cuts, voiceover. Every
round needs one entry that competes on appetite alone.

**Script (voiceover):**
> "Cheese pull like that is twenty minutes from your house. So's that one. That one's got a
> queue at four in the afternoon on a Tuesday. All of it sits in one feed, with directions.
> Free, on the App Store."

**Workflow:** `ugc-product-flow`.
**Falsifier:** high hook, low CTR → appetite gets attention but doesn't create app intent.
**Guardrail:** every food shot is **generated**, never lifted from the feed.

---

## 5. Production sequence

Order matters — it's built so the expensive step happens last.

1. **Load the workflow SKILL.md fresh** for each of the three flows in use
   (`ugc-saas-flow`, `ugc-flow`, `ugc-product-flow`). Their rule sets differ and contradict each
   other in places; never mix reference files between them.
2. **Check `balance`** and report it before generating anything.
3. **Generate ONE creator** with `soul_2` (3:4, 2k) and reuse that `character_media_id` across
   every concept. One recognisable face across the round builds familiarity and removes a
   variable from the test. The persona is **fictional** — synthetic media of a real private
   person is banned on TikTok even when labelled.
4. **Capture real app screenshots** for C1 (`ugc-saas-flow` uses genuine captures, never
   AI-generated UI). Sources: the five App Store Connect screenshots, or live web spot pages.
5. **Lock the scripts on paper.** Free. This is where hooks get fixed.
6. **Build and de-slop the storyboard boards.** Image-cost, not video-cost — all staging errors
   are visible and fixable here.
7. **Draft clips at `mode: "fast"` / 720p.** Confirms pacing, cuts, lip sync and accent.
8. **Irfan reviews the drafts.** One concept end-to-end first, then the rest as a batch.
9. **Final render at `std` / 1080p** only for approved drafts.
10. **`virality_predictor` on every final cut.** Weak hook score → re-cut, don't ship and hope.
11. **Frozen-frame QA by eye**, then publish with the AI-disclosure label.

**The Australian accent must be explicitly requested in every clip prompt** — the pipeline
defaults to an American accent, and an origin mentioned as context does not trigger the accent
machinery. Details in `references/higgsfield-prompt-language.md` §6.

---

## 6. Budget and schedule

| | |
|---|---|
| Recommended spend | **AU$40/day total** — AU$20 TikTok + AU$20 Meta |
| Duration | **5 days** |
| Round 1 total | **~AU$200** |
| Per concept | ~AU$8/day, ~AU$40 across the round |

That buys roughly 2,000–4,000 impressions per concept over the round — enough to read hook rate
with confidence, which is what round 1 is for. Spending more before knowing which idea works
just buys the same lesson at a higher price.

**Do not judge anything before day 3.** App Store campaign data has a 24-hour delay and needs
five downloads before a campaign appears at all.

---

## 7. Measurement setup

**Five campaign tokens — one per concept, shared across both platforms:**

```
ct=C1_graveyard   ct=C2_queue   ct=C3_newhere   ct=C4_argument   ct=C5_foodfirst
```

⚠️ **Deliberately not ten tokens.** Apple hides any campaign with fewer than five first-time
downloads. Splitting a ~AU$200 round across ten tokens risks every one landing under the floor
and reporting nothing at all. Concentrate downloads per *concept*; read the platform split from
TikTok's and Meta's own click data instead.

**Asset naming**, so a filename maps to a row without translation:

```
FF_TT_C1_reelsaver_h1_15s_v1
FF_IG_C1_reelsaver_h1_15s_v1
```

---

## 8. Decision rules — agreed before launch, not after

| Signal | Read | Action |
|---|---|---|
| Hook rate <20% | Nobody saw past the first 3s | Kill the hook, keep the concept, write hook 2 |
| Hook ≥30%, hold <30% | The middle is broken | Re-cut shorter, same concept |
| Hook and hold healthy, CTR weak | The CTA is the problem | Rewrite the close, not the video |
| All healthy, no downloads | The App Store page is the bottleneck | Stop making ads; fix screenshots and description |
| Two concepts clearly ahead | We have a direction | Round 2 = variations of those two only |

Benchmarks: TikTok hook rate 30%+ healthy, 40%+ elite. Meta 25% table stakes, 30%+ strong.
Hold rate 40–50% typical.

---

## 9. What only Irfan can do

1. **Close gate 1** — wait for 1.1.2 approval (or accept the risk in writing).
2. **Close gate 2** — buy `foodfomo.com`/`.app`, verify in Resend, set Supabase custom SMTP.
   This is the one that risks locking real users out of their accounts.
3. **Create the five campaign links** in App Store Connect → Analytics → Acquisition → Campaigns.
4. **Confirm the TikTok account is a business account** — personal creator accounts cannot link
   to App Store pages.
5. **Set the budget** and approve the five concepts.
6. **Approve every final cut** before it publishes.

---

## 10. What "success" looks like

At the end of round 1, we should be able to say: *these two concepts earn attention, these three
don't, and here's the one change we're making next.*

If we can say that for ~AU$200, the round paid for itself several times over — the alternative
is guessing at a concept and scaling it to four figures before finding out.
