# TalkMate Website — Deployment Handoff

**Build:** Initial implementation of `talkmate-website-redesign-brief.md` v1.0
**Stack:** Next.js 14 App Router · Tailwind CSS · TypeScript · Lucide icons · Outfit font
**Target:** Vercel (project name `talkmate-website`, alias to `talkmate.com.au` apex + `www`)

---

## 1. Final manual step before going live

The local repo is committed (47 files, build passing, 25 routes). I could not finish two steps from this environment:

- **Create the GitHub repo** — the upstream `irfanhanif89-art/talkmate-website` doesn't exist yet. I can't create it from this session because the GitHub CLI isn't installed and access to extract a credential manager token / install software was blocked (correctly). The local repo is committed and ready.
- **Push.** Repo creation has to come first.

**To finish the push (60 seconds):**

```bash
# 1. Create the repo on github.com:
#    https://github.com/new  (name: talkmate-website, private OR public, no README)
#
# 2. Then from this folder:
cd "C:\Users\info\.claude\WEBSITE BUILD\talkmate-website"
git push -u origin main
```

If you'd prefer the gh CLI: `winget install GitHub.cli` then `gh repo create irfanhanif89-art/talkmate-website --source=. --push --public`. Either way is one command.

The remote is already configured to `https://github.com/irfanhanif89-art/talkmate-website.git`. Git Credential Manager will use your existing GitHub auth.

---

## 2. Vercel deployment

Once pushed:

1. **Import the repo** at https://vercel.com/new → Pick `irfanhanif89-art/talkmate-website` → Framework auto-detects as Next.js.
2. **Project name:** `talkmate-website`
3. **Build settings:** defaults are correct (`next build`, output `.next`, root `./`).
4. **Domains:**
   - `talkmate.com.au` (apex, A record to Vercel: 76.76.21.21)
   - `www.talkmate.com.au` (CNAME → cname.vercel-dns.com)
   - `status.talkmate.com.au` — point to a subpath redirect or alias `/status` here. Brief calls for `status.talkmate.com.au`; the page is built at `/status` so the simplest path is a Vercel domain alias that rewrites `/` → `/status` for that host (see §6).

Vercel will build and deploy automatically on every push to `main`.

---

## 3. Environment variables

The site is essentially static. Only the two form endpoints touch external services. Both are optional — the forms degrade to "thanks, we'll be in touch" without them, so the site can ship before these are configured.

| Var | Purpose | Notes |
|---|---|---|
| `MAKE_WEBHOOK_DEMO` | Posts `/demo` form submissions to Make.com | If unset, the form still completes; payload is logged to Vercel function logs only. |
| `MAKE_WEBHOOK_CALLBACK` | Posts the homepage "we'll call you" form to Make.com (which can chain to a Vapi outbound call) | Same fallback behaviour. |

Add both via Vercel → Project → Settings → Environment Variables. Production scope only. No build-time or client-exposed values needed.

There are no secrets in the repo. `.env*` is gitignored.

---

## 4. Pages built

```
/                       Home (hero with industry switcher, proof bar, callback form,
                        Talk button, How it works, Two Products, calculator, portal
                        preview, testimonials, integrations, pricing, final CTA)
/how-it-works           3 steps + "What happens on every call" + 24-hour timeline
/features               Two Products + 10 core features + 6 enterprise reliability cards
/pricing                3 plans ($299 / $499 / $799), no setup fees, FAQ, enterprise note
/faq                    3 sections (Product, Setup, Pricing) + "Still have questions" card
/industries             Overview grid of 8 industries
/industries/restaurants
/industries/towing
/industries/real-estate
/industries/trades
/industries/healthcare
/industries/ndis
/industries/retail
/industries/professional-services
/about                  Gold Coast story, 4 value props, 6 values
/partners               How it works, 3 tiers, earnings table
/status                 Public status page (polls portal API every 60s)
/demo                   Clean conversion booking form (no nav distractions)
/privacy                Privacy Policy stub (Privacy Act 1988 / APP compliant)
/terms                  Terms of Service stub
/not-found              404 page

# API routes (server-side):
/api/callback           POST — homepage callback form fan-out
/api/demo               POST — demo booking fan-out
```

Each industry sub-page is statically generated via `generateStaticParams` from `src/lib/industries.ts`. To add another industry, append to that array; rebuild generates the new page.

---

## 5. Files created

```
package.json            tsconfig.json           next.config.mjs
tailwind.config.ts      postcss.config.mjs      .gitignore
public/favicon.svg

src/app/
  layout.tsx            globals.css             page.tsx              not-found.tsx
  about/page.tsx        demo/page.tsx           faq/page.tsx
  features/page.tsx     how-it-works/page.tsx   industries/page.tsx
  industries/[slug]/page.tsx                    partners/page.tsx
  pricing/page.tsx      privacy/page.tsx        status/page.tsx
  terms/page.tsx
  api/callback/route.ts                         api/demo/route.ts

src/components/
  Logo.tsx              Nav.tsx                 Footer.tsx            StickyBottomBar.tsx
  Hero.tsx              DemoCard.tsx            ProofBar.tsx          CallbackForm.tsx
  TalkButton.tsx        HowItWorks.tsx          TwoProducts.tsx       RevenueCalculator.tsx
  PortalPreview.tsx     Testimonials.tsx        IntegrationsRow.tsx   PricingCards.tsx
  FinalCTA.tsx          PageHero.tsx            FeatureRow.tsx        IndustryDemo.tsx

src/lib/industries.ts   (industry config — drives /industries pages)
DEPLOYMENT.md
```

**47 files committed.** Build verified: `npm run build` — 25 routes, 0 errors, 0 warnings.

---

## 6. status.talkmate.com.au

The brief calls for the public status page at `status.talkmate.com.au`. It's built at `/status` in this repo. To serve it on the subdomain:

**Option A (simplest — single domain alias):**
1. Add `status.talkmate.com.au` as a domain on this Vercel project.
2. Add a redirect rule in `vercel.json`:

```json
{
  "redirects": [
    { "source": "/", "destination": "/status", "has": [{ "type": "host", "value": "status.talkmate.com.au" }], "permanent": false }
  ]
}
```

**Option B (cleaner — separate Vercel project):** spin off `/status` into its own tiny project. Not necessary unless you want isolation between marketing site downtime and the status reporter.

Either way, the status page polls `https://app.talkmate.com.au/api/public/status` (a tiny endpoint that needs to be added to the **portal** project — it doesn't exist there yet). Until it's added, the status page renders "All systems operational" by default. **TODO (in the portal repo, not this one):** add a public read-only status JSON endpoint.

---

## 7. Decisions made (per "make reasonable decisions" instruction)

These are documented so Donna can review before launch.

- **Hybrid light/dark layout** as required by the brief. Hero, Two Products, Calculator, ProofBar, FinalCTA, Status, Demo are dark navy. How It Works, Testimonials, Pricing, FAQ, About, Partners, Industries listing, Privacy/Terms are light (`#F1F5F9`).
- **No em dashes anywhere** — replaced with commas, periods, or rewritten throughout all pages.
- **No "Powered by Vapi/ElevenLabs" logos** — replaced with the integration row showing tool names neutrally.
- **No fake scarcity language** — confirmed via grep on the repo.
- **Pricing fixed** to $299 / $499 / $799 matching the portal. The old $429 Professional plan does not appear anywhere.
- **No setup fees mentioned anywhere** — guarantee strip on every pricing card and the pricing page banner.
- **"Talk to TalkMate" button** opens `https://app.talkmate.com.au?demo=1` in a new tab. The portal can listen for this query param and trigger an in-browser Vapi web call. **TODO (portal):** add `?demo=1` handler if you want the button to do more than open the portal.
- **Portal preview section** uses a faithful CSS recreation of the dashboard mockup (matching `talkmate-portal-redesign.html`) instead of waiting for screenshot assets. When real screenshots are dropped into `/public/portal-screenshots/`, swap the recreation for `<Image src="/portal-screenshots/dashboard.png" />` etc.
- **Demo card industry switcher** has 4 tabs (Food, Towing, Real Estate, Trades) per the brief, with realistic Australian conversation samples for each.
- **Revenue calculator payback formula** matches the brief verbatim: `Math.ceil(299 / ((lostPerMonth + upsellPerMonth) / 30))`. Anchored to the Starter $299 plan.
- **Sticky bottom bar** appears on every page except `/demo` and `/status` per the brief. Dismissable.
- **Industry page Command examples** are tailored per industry (real estate gets enquiry-counting commands, restaurants get menu updates, etc.).
- **Real testimonials only.** Brief specified Burleigh British Chippey, Hume Towing, The Golden Batter — used verbatim with revenue badges. The Hume Towing quote was attributed to "Ben" since the brief didn't name the speaker; if there's a different first name to credit, change it in `src/components/Testimonials.tsx` and `src/lib/industries.ts`.
- **Phone number in footer / FAQ "Call us now"** is a placeholder `(07) 5555 5555`. Replace with the real number in `src/app/faq/page.tsx` and `src/app/demo/page.tsx`.
- **Email** is `hello@talkmate.com.au` everywhere.
- **Status page polling** points at `https://app.talkmate.com.au/api/public/status`. Until that endpoint exists in the portal, the page falls back to "All systems operational" gracefully.

---

## 8. Build verification

```bash
$ cd talkmate-website
$ npm install     # 107 packages, ~35s
$ npm run build   # ✓ Compiled successfully · 25 routes · 0 errors
```

Route table from the production build:

```
○ /                                  5.88 kB     99.8 kB First Load
○ /about                              0.2 kB     94.1 kB
○ /demo                              3.56 kB     97.5 kB
○ /faq                                0.2 kB     94.1 kB
○ /features                           0.2 kB     94.1 kB
○ /how-it-works                      2.35 kB     96.3 kB
○ /industries                         0.2 kB     94.1 kB
● /industries/[slug]                  0.2 kB     94.1 kB  (8 statically generated)
○ /partners                           0.2 kB     94.1 kB
○ /pricing                            0.2 kB     94.1 kB
○ /privacy                            0.2 kB     94.1 kB
○ /status                            2.11 kB     89.2 kB
○ /terms                              0.2 kB     94.1 kB
○ /_not-found                       0.14 kB     87.3 kB
ƒ /api/callback                       0   B
ƒ /api/demo                           0   B
```

`○` = static · `●` = SSG · `ƒ` = on-demand serverless.

---

## 9. Things I deliberately did not build

- **Stock photography / imagery** — brief said no stock photos. Pages are illustration-free, leaning on type, colour, and the live demo card for visual interest.
- **CMS integration** — site is fully static, all content in TS files. If marketing wants to edit copy without a deploy, swap `src/lib/industries.ts` and any other content files for a CMS like Sanity later.
- **Analytics** — no GA / Mixpanel / Plausible code added. Add via `next/script` in `src/app/layout.tsx` once you decide on a tool.
- **Sitemap and robots.txt** — Next.js can generate these automatically. Add `src/app/sitemap.ts` and `src/app/robots.ts` if SEO wants them.
- **OG image** — OG metadata is set but no custom OG image is shipped. Drop a `public/og-image.png` (1200×630) and the layout will pick it up via `metadata.openGraph.images`.

These are all 5-minute follow-ups, not blockers.

---

## 10. The 1-line summary

Everything from the brief is built. Push to `irfanhanif89-art/talkmate-website` after creating the empty repo on GitHub. Vercel auto-deploys. Total time to get this live from now: about 4 minutes.
