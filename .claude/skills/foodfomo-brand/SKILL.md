---
name: foodfomo-brand
description: Single source of truth for all FoodFOMO facts — product, App Store IDs, live cities and spot counts, features, brand voice, honesty rules, and the constraints that affect marketing. Use this skill whenever producing ANY FoodFOMO content — ads, captions, App Store copy, landing pages, emails, briefs, or press — and whenever answering questions about what FoodFOMO currently is or does. FoodFOMO is NOT TalkMate; never use talkmate-brand for FoodFOMO work.
---

# FoodFOMO — Brand Source of Truth

> **Provenance.** Every fact here is drawn from `irfanhanif89-art/foodfomo` → `SYSTEM_MAP.md`,
> which is the live source of truth. This skill is a *marketing-facing extract*.
> **The system map wins any conflict.** Re-read it before a campaign and update this file
> in the same session if it has moved on. Last synced: **2026-08-05**.

> ⚠️ **FoodFOMO ≠ TalkMate.** TalkMate is an AI phone receptionist for Australian service
> businesses. FoodFOMO is a consumer food-discovery iOS app. They share nothing but an owner
> and a Supabase login. Never mix their voice, claims, colours, or audience.

---

## 1. What FoodFOMO is (say it this way)

**The one-liner:** FoodFOMO shows you the food everyone in your city is losing their mind over —
and tells you whether it actually lives up to the hype.

**The mechanic:** it finds the food videos going viral in your city, works out which real venue
each one is about, and puts them in one feed you can act on — directions, book, or save.

**What makes it different from just scrolling TikTok:** on TikTok you watch a great food video,
save it, and never find it again. FoodFOMO attaches the *venue* to the video. Every card is a
place you can actually go tonight.

**The honesty spine — this is the brand's real differentiator.** After you visit, the app asks
whether it lived up to the hype. FoodFOMO is the app that admits when viral food is
overrated. Never write copy that contradicts this by over-claiming.

### Core loops
1. **Discovery** — viral food/drink content is scraped, scored, and attached to a real venue.
2. **Browse** — city feed of autoplaying cards, sorted by heat; map; drinks feed; saves.
3. **Conversion** — "Take Me There" (Google Maps) and Book/Order, both click-logged.
4. **Validation** — after a visit, "did it live up to the hype?" → hype vs reality ratings.

---

## 2. Hard product facts

| Fact | Value |
|---|---|
| Platform | **iOS only.** No Android build exists. |
| App Store territory | **Australia only** |
| App Store ID | **6777933391** |
| App Store URL | `https://apps.apple.com/app/apple-store/id6777933391` |
| Bundle id | `com.foodfomo.app` |
| Category / price | Food & Drink · **Free** |
| Age rating | **18+** (the drinks feed) — see §5 |
| Apple developer account | **Jade Barber** (Team 6772MJ8VG7) |
| Web backend | `https://foodfomo.vercel.app` — **no custom domain owned yet** |
| Universal links | Live, claiming `/*/spot/*` (a spot link opens the app if installed) |
| Currently live version | **1.1.0** |
| In review | **1.1.2 (build 26)**, submitted 2026-08-05, auto-release on approval |

### Live cities and real spot counts (2026-08-05 — verify before every campaign)

| City | Live spots | Advertise? |
|---|---|---|
| Melbourne | **68** | ✅ Primary |
| Sydney | **62** | ✅ Primary |
| Brisbane | mid | ⚠️ Secondary |
| Gold Coast | mid | ⚠️ Secondary |
| Perth | mid | ⚠️ Secondary |
| Adelaide | mid | ⚠️ Secondary |
| Darwin | mid | ⚠️ Secondary |
| Canberra | **6** | ❌ Do not advertise |
| Hobart | **6** | ❌ Do not advertise |

**Feed total: 251 live spots, 0 unplayable.** Canberra and Hobart were halved by the §8e
playability purge and are thin. Sending paid traffic to a six-spot city buys a bounce.
Get fresh counts from the system map or the live feed before committing budget.

### Features that are actually shipped
Immersive autoplaying video feed · food **and** drinks feeds · city picker · heat map ·
**Take Me There** (Google Maps directions) · **Book / Order** buttons · check-ins ·
hype-vs-reality verdicts · **saves** (server-side, 1.1.2) · share a spot · first-run tutorial ·
**halal filter** · Suggest a Spot · category chips including Café and Mexican ·
sign-in with Apple and Google · guest browsing with gating on personal features.

### Do NOT claim
- ❌ Android, web app, or "available everywhere" — it is iOS, Australia, App Store only.
- ❌ Bookings for every venue. `booking_url` is often null and that is deliberate — those
  venues are genuinely walk-in-only. **Never fake a booking claim.**
- ❌ Halal coverage as a headline. Halal is tagged **only on explicit signal**, never inferred
  from cuisine. It is an honest, partial filter — describe it as one.
- ❌ Any city having "hundreds of spots". The national total is ~251.
- ❌ Delivery. FoodFOMO does not deliver anything.

---

## 3. Brand voice

**Australian, plain, and a bit hungry.** Written the way someone texts a mate about a place
they just found — not the way a brand writes about a platform.

- Australian spelling and idiom. Melbourne, not "Melb City". No American food words
  ("entrée" ≠ main, no "biscuits and gravy" energy).
- **Short sentences. Concrete nouns.** "The cheeseburger everyone in Melbourne is queuing for"
  beats "curated culinary discovery experiences".
- Name real food. Real suburbs. Real dishes. Specificity is the whole trick.
- **Never over-claim.** The product's edge is honesty about hype. Marketing that over-hypes
  is off-brand at a structural level, not just a tonal one.
- No emoji spam. No "🔥🔥🔥". One emoji, used deliberately, is plenty.
- Never say "AI-powered" in consumer copy. Nobody chooses a dinner app for its model.

**Words that fit:** viral, queue, line, hype, worth it, overrated, hidden, tonight, near you,
actually good, everyone's talking about.

**Words that don't:** curated, seamless, revolutionary, one-stop, foodie journey, elevate,
unlock, game-changing, effortless.

---

## 4. People

- **Irfan** — owner. Makes all spend and strategy calls.
- **Jade Barber** — holds the Apple developer account; the approver for anything published.
- Nothing goes live — post, ad, or App Store change — without one of them approving it.

---

## 5. Constraints that shape every campaign

These are not footnotes. They change what you are allowed to build and buy.

1. **🔴 Email is test-grade.** Signup confirmation is OFF (so signups work), but **password
   reset still goes through Supabase's built-in mailer** — a few sends an hour, poor
   deliverability. At real install volume some users will be locked out of their accounts with
   no way back in. The system map's own words: **do this before any marketing push.**
   Fix = buy `foodfomo.com`/`.app` → verify in Resend → Supabase custom SMTP.
2. **🔴 No attribution SDK.** No MMP, no SKAdNetwork configuration, no Meta or TikTok SDK.
   You **cannot** run install-optimised app campaigns today. Traffic campaigns to an App Store
   campaign link are the only honest option — see the `foodfomo-ugc-ads` skill for the
   measurement setup. App Privacy is currently declared as **no tracking, no ATT prompt**;
   adding an attribution SDK later changes that declaration and requires an ATT prompt.
3. **18+ age rating.** Ad targeting must be 18+. This is not optional, and it also means
   creative should not read as aimed at teenagers.
4. **iOS + Australia only.** Every campaign is geo-locked to Australia and device-targeted to
   iOS. Paying to reach an Android user in Australia is paying for nothing.
5. **The live app is 1.1.0 until 1.1.2 is approved.** 1.1.0 ships a dead
   "Share a link instead" button and a check-in button that renders as an empty circle.
   Do not buy traffic into known-broken builds.
6. **Creator content is not yours.** The feed is built from other people's TikToks and
   Instagram Reels. Those videos are **fine in the product** (official embeds, attributed) and
   **not fine in a paid ad**. Never put a scraped reel in ad creative.
7. **No venue endorsement.** Never imply a restaurant sponsors, partners with, or endorses
   FoodFOMO. Naming a venue as a place that appears in the app is fine; implying a
   relationship is not.

---

## 6. Assets and coordinates

- **App Store URL (plain):** `https://apps.apple.com/app/apple-store/id6777933391`
- **Campaign link format:** `…/id6777933391?pt=<provider>&ct=<campaign>&mt=8`
- **Deep link (spot):** `https://foodfomo.vercel.app/<city>/spot/<id>` — opens the app when
  installed, otherwise the web page. ⚠️ The bare `foodfomo.vercel.app` domain reads as
  unfinished in an ad; prefer the App Store link as the paid CTA until a domain is bought.
- **Screenshots:** five dark App Store screenshots exist in App Store Connect. There is no Mac
  in the setup, so new device captures need the owner or the web spot pages.

---

## 7. Before you use this skill for a campaign

Run this check — it takes two minutes and prevents expensive mistakes:

- [ ] Re-read `SYSTEM_MAP.md` → "CURRENT STATE" for anything that moved.
- [ ] Confirm the live App Store version and whether 1.1.2 has been approved.
- [ ] Pull current live spot counts per city; update §2 if they moved.
- [ ] Confirm whether the email/SMTP blocker is closed.
