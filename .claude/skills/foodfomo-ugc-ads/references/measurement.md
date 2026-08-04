# Measurement + the first test round

FoodFOMO has **no MMP, no SKAdNetwork setup, no Meta or TikTok SDK**. That single fact decides
the entire campaign structure, so start here.

---

## 1. What you can and cannot run

**Cannot:** install-optimised app campaigns (Meta App Promotion, TikTok App Installs). Those
need a calibrated MMP — AppsFlyer, Adjust or Singular — plus SKAN 4. Without one, the platform
can't see installs, so it can't optimise toward them. Running one anyway means paying for an
algorithm optimising blind.

**Can:** **traffic campaigns pointed at an App Store campaign link**, measured in App Store
Connect Analytics. Less precise, entirely honest, and enough to find out which *idea* works —
which is the only question round 1 needs to answer.

**Later:** adding an attribution SDK unlocks install-optimised campaigns, but it changes App
Privacy to Tracking = Yes and requires an ATT prompt. That is a product decision with a real
UX cost, not a marketing checkbox. Raise it once a concept has proven itself — not before.

---

## 2. App Store Connect campaign links

Create in **App Store Connect → your app → Analytics → Acquisition → Campaigns → +**.
Campaign name (the token) allows up to 30 alphanumeric characters and spaces.

The generated link looks like:

```
https://apps.apple.com/app/apple-store/id6777933391?pt=<provider>&ct=<campaign>&mt=8
```

Reported per campaign: **impressions, product page views, first-time downloads, usage, sales,
subscriptions** — filterable by territory and device.

### The caveats that matter

| Caveat | Consequence |
|---|---|
| Data appears only after **24 hours** | Don't judge anything on day one. |
| Needs **at least 5 first-time downloads** to appear at all | A concept with 3 downloads shows as nothing, not as zero. Budget enough to clear the floor. |
| Attribution window is **24 hours** from click | Someone who installs three days later is invisible. Real performance is somewhat better than reported. |
| **Last-touch** — most recent link takes credit | Overlapping campaigns muddy each other. Run round 1 concepts concurrently but keep the set small. |
| Bulk export only via the Analytics Reports API | Manual reading is fine at this scale. |

### Token scheme

**One `ct` per concept, shared across both platforms:**

```
ct=C1_graveyard   ct=C2_queue   ct=C3_newhere   ct=C4_argument   ct=C5_foodfirst
```

⚠️ **Do not split tokens by platform at low budget.** It is tempting to run `TT_C1` and `IG_C1`
separately, but Apple hides any campaign with fewer than five first-time downloads. On a
~AU$200 round, ten tokens risks every single one landing under the floor and reporting nothing
at all — you would spend the whole budget and learn zero. Concentrate downloads per *concept*
so each token can clear the threshold, and read the platform split from TikTok's and Meta's own
click data, which has no such floor.

Revisit this once a concept is scaling and download volume per platform comfortably clears five.

Asset names still carry the platform, so a filename maps to a row with one obvious grouping:
`FF_TT_C1_reelsaver_h1_15s_v1`.

**TikTok:** App Store links are only allowed from **business accounts**, not personal creator
accounts. Confirm the account type before launch.

---

## 3. Round 1 — the actual test plan

The goal of round 1 is **not installs**. It is finding out which concept earns attention.
Judge it on hook rate and hold rate; treat installs as a bonus at this budget.

| | |
|---|---|
| Concepts | **5** (C1–C5), one variation each |
| Platforms | TikTok + Instagram Reels, same creative, same structure |
| Geo | **Australia**, Melbourne + Sydney |
| Device | **iOS only** |
| Age | **18+** |
| Objective | Traffic → App Store campaign link |
| Budget | Start small — enough per concept per day to clear ~1,000 impressions, so hook rate is readable. Irfan sets the number; recommend a floor, not a ceiling. |
| Duration | **3–5 days minimum.** Don't kill an ad on day one — the 24h data delay alone makes day-one judgement meaningless. |
| Decision metrics | Hook rate → hold rate → CTR → downloads, in that order |

### Kill / scale rules — decided before launch, not after

- **Hook rate under 20%** after ~1,000 impressions → kill the hook, keep the concept, try hook 2.
- **Hook 30%+, hold under 30%** → the middle is broken. Re-cut shorter, same concept.
- **Hook and hold both healthy, CTR weak** → the CTA is the problem, not the video.
- **Everything healthy, no downloads** → the App Store listing is the bottleneck. Stop making
  ads and go fix screenshots and the description.
- **Two concepts clearly ahead** → round 2 makes variations of those two only.

Write the expected result down *before* launch. A round that produces a clear negative is a
successful round; a round with no prediction to compare against produces nothing but opinions.

---

## 4. What to report back

After each round, hand Irfan a table — one row per concept:

| Concept | Impressions | Hook rate | Hold rate | CTR | Downloads (ASC) | Verdict |
|---|---|---|---|---|---|---|

Plus, in plain words: which stage failed, what one thing changes next, and whether the concept
survives. Never a wall of platform metrics with no reading attached.

---

## Sources

- [Apple — App Store Connect campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/)
- [Tracking app installs from Instagram & TikTok](https://medium.com/@felix.cameron0/how-to-track-app-installs-revenue-from-instagram-tiktok-8e94feaf6231) · [Why UTM parameters don't work for app installs](https://medium.com/@felix.cameron0/why-utm-parameters-dont-work-for-mobile-app-installs-2ba4377f58f7)
- [TikTok blocks App Store links from personal creator bios](https://techcrunch.com/2023/03/08/tiktok-begins-blocking-links-to-app-store-pages-from-creators-bios/)
- [TikTok AI ad disclosure rules 2026](https://commonthreadco.com/blogs/coachs-corner/tiktok-ai-ad-disclosure-rules-ecommerce-2026) · [TikTok AI content policy 2026](https://www.cinerads.com/blog/tiktok-ai-content-policy)
- [Meta app install campaigns 2026 field guide](https://adlibrary.com/posts/meta-ads-for-app-install-campaigns)
