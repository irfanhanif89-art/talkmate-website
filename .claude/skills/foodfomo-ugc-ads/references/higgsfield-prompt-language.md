# The Higgsfield prompt language — how to actually get the output

Source: the bundled Higgsfield workflow rule sets, read directly from the MCP server
(`get_workflow_instructions` → `ugc-flow`, then `get_workflow_bundle_file` on
`references/ugc-board.md` and `references/ugc-clip.md`). Not blog guesswork — this is the
spec the pipeline itself enforces.

**Load the workflow before every production run.** These rules change with workflow versions,
and the loaded SKILL.md always wins over this summary.

---

## 1. The thing that surprises everyone first

**A 15-second UGC ad is not one prompt.** It's a two-stage build:

```
creator reference image   (soul_2,        3:4,  2k)
        ↓
8-slot storyboard sheet   (gpt_image_2,  16:9,  2k)   ← eight beats, one horizontal row
        ↓
de-slop pass              (seedream_v5_pro, 16:9, 2k)  ← MANDATORY, never skip
        ↓
one video clip            (seedance_2_0,  9:16, 1080p) ← 8 internal hard cuts
```

The storyboard sheet is eight 9:16 panels side by side on a 16:9 sheet. Seedance reads it as a
**narrative map** — eight beats it renders as eight hard cuts inside a single clip.

**Duration decides how many boards you need:**

| Total duration | Boards/clips |
|---|---|
| 4–15s | **1** |
| 16–19s | 2 |
| 20–30s | 2 (15 + rest) |
| 31–45s | 3 |
| 46–60s | 4 |

**Our 15s spec is deliberately the cheapest possible unit** — one board, one clip. A 16-second
ad costs double. Never let a script creep to 16 seconds.

---

## 2. The prompt that fails, and why

> ❌ "Create a UGC ad with a 26-year-old Australian female talking about FoodFOMO"

Four separate rule violations:

1. **You never describe the creator in the prompt.** Identity comes from a reference image. The
   board rules are explicit: *never describe the character's age, ethnicity, attractiveness,
   makeup, or facial features beyond what the reference image supplies.* You generate the
   creator once with `soul_2`, then reference them as *"the same person from the character
   reference image, with identical face, hair, body, and identity across all eight slots."*
2. **"26-year-old" is doubly banned** — the clip rules are **age-blind**: never write boy, girl,
   child, kid, young, teen, or an age.
3. **No slot structure.** Without eight explicitly-framed slots, you get a poster, not a video.
4. **"Australian" in a character description does nothing.** Accent machinery only fires on an
   *explicit accent request* — see §6, which is the single most important section for us.

---

## 3. The board prompt — required shape

The prompt string must open with `@ImageN` declarations **in the same order as the `medias`
array**, then follow this skeleton:

```
[@Image1 product reference + ANGLE LOCK] [@Image2 character reference] [@Image3 previous board, K>1]
The same person appears in every slot with identical face, hair, body, and identity.

A single ultra-wide horizontal storyboard sheet composed of exactly EIGHT equal-size 9:16
vertical slots in ONE HORIZONTAL ROW, thin white gutters, clean white background, total sheet
aspect 16:9. Do NOT make two rows and do NOT make a grid.
[…setting/lighting inheritance…] […product scale + placement…] […hand-count law…]

Slot 1 — exact 9:16 vertical photorealistic UGC iPhone still, [POV], [DISTANCE BAND]:
  [action, explicit role for BOTH hands, micro-behavior, light note].
Slot 2 — … (different POV and band from slot 1)
… through Slot 8.

Rendering rules: […the full negative tail…]
```

### The anti-morph engine — the rule that decides whether you get cuts or mush

Seedance turns a slot boundary into a **crisp hard cut only when adjacent slots are visually far
apart.** Two neighbouring slots sharing POV *and* distance band **morph** into a smeary blend.

Every adjacent pair must differ on three axes at once:

1. **POV alternates** — SELFIE ↔ STATIC, never twice in a row.
2. **Distance band rotates** — TIGHT/MACRO · MID · WIDE. Adjacent slots from different bands;
   each band appears at least twice across the eight.
3. **A different physical action** every slot.

Default cadence that satisfies all three:

```
SELFIE-MID → STATIC-WIDE → STATIC-MACRO → SELFIE-TIGHT →
STATIC-MID → STATIC-MACRO → STATIC-WIDE → SELFIE-TIGHT
```

**Every slot must state its framing distance explicitly** — `TIGHT CLOSE-UP`, `MEDIUM`,
`MACRO`, `THREE-QUARTER`, `WAIST-UP`, `FULL-BODY WIDE`, `PRODUCT-EXTENDED`.

### The hand-count law

Two hands. Selfie POV occupies one with the phone, leaving **one** free — so two-object holds in
selfie POV are illegal and force a static camera. Every slot names what **each** hand is doing,
with the idle hand explicitly parked ("left hand holds phone off-frame, right hand rests on the
counter"). More than two simultaneous hand-roles = rewrite. This is the rule that prevents third
arms.

### The de-slop pass — mandatory, two calls

Never feed a raw `gpt_image_2` board to Seedance. Import the board URL with `media_import_url`,
then re-render through `seedream_v5_pro` with the exact preservation prompt from the workflow —
it keeps framing/composition/faces 1:1 and changes only micro-realism (pore-level skin, flat
iPhone light, real sensor noise), while banning waxy skin, HDR bloom, teal-orange grade and
bokeh. The cleaned board replaces the original everywhere downstream.

---

## 4. The clip prompt — required shape

Five blocks, in this exact order:

```
Style & Mood:        UGC iPhone aesthetic, [light], [SELFIE|STATIC|MIXED cadence], vertical.
Narrative Summary:   [1 sentence] + register calibration phrase.
Dynamic Description: Cut 1 (0–Xs) — [DISTANCE] [POV]: [action, both hands, 2+ micro-behaviours,
                     expression, product placement]. Hard cut to.
                     … Cut 8 (no marker after 8).
Static Description:  [setting, ambient detail, props, light direction].
Audio:               She speaks to camera, iPhone microphone audio with natural room tone:
                     "[monologue verbatim]"
[quality suffix + full negative tail]
```

**`Hard cut to.` appears verbatim, seven times** — between every adjacent pair. Without them the
cuts collapse into smooth motion. This is the single highest-leverage string in the whole prompt.

### Per-cut requirements (all four, every cut)

1. **2–3 concrete micro-beats** from the register-matched menu (raised brows with a genuine grin,
   lean-in toward the lens, satisfied slow nod…). Rotate; never repeat a combination.
2. **At least one within-cut motion beat** — something that *evolves* during the cut.
3. **Expression evolution across the eight** — never the same expression twice.
4. **Placement discipline** — movements land between phrases, never on a key word.

Plus, per clip: **one unguarded micro-beat** (a stumble, a recovered eye-flick, a "wait, what was
I saying") and **one small goofy moment**. Wooden, posed-throughout performances read as AI.

**Banned cut descriptions:** "smiles at the camera", "looks at the camera", "holds the product
and talks". Any sentence that only restates what the board already shows is forbidden — every
sentence must add motion, sound, breath, or weight transfer.

### The 0.1-second hook law

Cut 1 opens **already mid-event** — a hand already moving, a head mid-turn. Never a settled
pose, never someone composing themselves. And the **first spoken word lands within 0.0–0.4s**.
No breath-before-speaking, no silent lead-in. A clip that starts at rest is dead before its
first sentence.

---

## 5. Script rules the engine enforces

**Banned as the literal first word** (they read as recording-warmup):
`OK` · `Okay` · `Alright` · `So` · `Yeah so` · `Um` · `Well` · `Like` · `Wait` · `Wait what` ·
`Hold on` · `OMG` · `Hey guys` · `Guys` · `So basically` · `Story time` · **`Stop scrolling`** ·
`Let me tell you about`. All are fine mid-sentence — the ban is positional.

**Banned anywhere — the AI tells:**
`I'm obsessed` (in any form) · `you have to try this` · `you NEED this` · `it's amazing` ·
`so good` · `mind-blowing` · `trust me on this` · `game changer` · `10/10` · `100%` ·
`literally` as filler · `holy grail` · `hits different` · `and honestly?` · plus the corporate
register: `elevate` · `seamless` · `effortless` · `revolutionary` · and `This is X, not Y`
constructions.

**The specificity law:** every claim carries one concrete — a number, a time, a place. Real
creators describe *sensations and moments*, not abstract feelings. "It lasted through dinner and
an Uber home" beats "it's amazing".

**No phrase repeats across cuts.** Each cut owns a different chunk of the monologue.
**One closed-mouth beat per clip minimum** — lip sync is the weakest zone.
**Word density is fixed upstream** — if a line is too long, dedupe to the shorter rewording
rather than speeding up delivery.

---

## 6. 🇦🇺 The Australian accent — the one that will bite us

**The workflow's default is English speech with an American accent.** It says so in the hard
rules. For an Australia-only campaign, an American voice is a tell that kills the ad.

The accent machinery **only activates on an explicit accent request**. An origin mentioned as
scene context — "she's in Melbourne", "Australian creator" — does **not** trigger it. No explicit
request means a neutral American voice, silently.

When it is activated, the rules are specific:

- The **persona sentence opens the Narrative Summary**: `[origin/identity] + [attitude] +
  "speaks and moves exactly like that"` — restated verbatim in every board.
- **Echoed in the Audio line:** "She speaks to camera with a **strong Australian accent** —
  [1–2 described qualities] — iPhone microphone audio with natural room tone: …"
- **Described qualities only, pitched two levels stronger than feels natural.** Never phonetic
  spelling (it breaks lip sync). **Never "slight", "subtle", or "light"** — that is exactly how
  an accent disappears.
- Append to the negative tail: `no neutral accent, no generic American voice, no flat monotone
  delivery`.

**Standing rule for FoodFOMO: every clip prompt carries an explicit strong-Australian-accent
request in both the Narrative Summary and the Audio line, plus the three negatives.** No
exceptions. Check it on every generation.

---

## 7. Register gating — why the word "hyped" is dangerous

The engine reads the brief for tone signals and switches menus:

| Register | Trigger | Result |
|---|---|---|
| **NATURAL** | **default, no signal needed** | Genuine reactions, lively but human. **This is what FoodFOMO wants.** |
| HYPED | the words `hyped` · `hype` · `energetic` · `explosive` · `high-energy` · `viral energy` · `insane energy` | Screaming, jaw-blown-open, "INSANELY hyped creator with explosive screaming energy throughout" |
| CALM | `goth` · `deadpan` · `clinical` · `refined` · `minimal` · `quiet` · `GRWM` · `routine` | Flat, still, no expression spikes |

⚠️ **FoodFOMO's brand vocabulary contains the word "hype" constantly** — it's literally the
product's core mechanic ("hype vs reality"). Putting it in a brief flips the whole ad to
screaming-creator mode, which is off-brand and looks like every other AI ad.

**Rule: the word "hype" may appear in the spoken monologue, never in the tone/brief fields.**
When describing tone, write "natural, engaged, conversational" and let the default hold.

---

## 8. Credit discipline — where the money actually goes

Checked against `models_explore` on `seedance_2_0`:

| Lever | Detail |
|---|---|
| **Keep ads ≤15s** | One board + one clip. 16s doubles it. |
| **`mode: "fast"` for drafts** | 480p/720p only, cheaper and faster. `std` is required for 1080p/4k. **Draft the staging and script in fast/720p, then re-run the approved prompt in std/1080p.** |
| **Iterate on the board, not the video** | The board is an image call. Staging errors — wrong POV cadence, bad hand allocation, product in the wrong slot — are all visible in the board and cost an image to fix, not a video. |
| **The de-slop pass is not optional** | Skipping it to save a call produces waxy AI skin, which fails the whole ad. |
| **`use_unlim`** | `seedance_2_0` supports it, but this account currently shows `unlim.available: false` — no free-trial allowance to spend. Never pass the flag speculatively; check `show_plans_and_credits` if it matters. |
| **Check `balance` first** | Report it before generating, every session. |

**The honest correction to the "swap the hook cheaply" idea:** at 15s the whole ad is a *single*
clip, so a hook change means re-rolling that clip. There is no cheap hook swap at this length.
The cheap iteration surface is **the board and the written monologue** — get both right on paper
and in image form before any video call. That is where the credit saving actually lives.

### Frozen-frame QA — before anything is shown or spent on

Pull evenly spaced stills plus 2–3 mid-word frames and check by eye:
exactly one hero product · ≤2 hands per person (count mirrors and frame edges) ·
absent features stayed absent · prop states consistent (cap on **or** off, never both) ·
no gibberish labels · lips free of doubled edges on mid-word frames · face matches the
character reference · no baked text. A motion pass misses frozen-frame defects.

---

## 9. FoodFOMO's specific wrinkle: we have no physical product

Every UGC workflow is built around a product in a hand. Ours is an app. That changes routing:

- **`ugc-saas-flow` is the right home for app-on-screen concepts.** It uses **real captured
  screenshots** as overlay cards — never a screen recording, never AI-generated UI. Load its
  SKILL.md separately before building; its rules differ from `ugc-flow` and the two contradict
  each other in places. Do not mix reference files between flows.
- **For `ugc-flow` concepts with no product on camera** (C3, C4), run the no-product path: the
  `@ImageN` numbering shifts up and the product entries drop out of `medias`.
- **A phone is never visible in frame.** Selfie POV means the camera *is* the phone. So "she
  holds up her phone showing the app" is not a shot we can ask for in `ugc-flow` — that's
  precisely why app-on-screen concepts route to `ugc-saas-flow` instead.

---

## 10. Pre-generation checklist

- [ ] Workflow SKILL.md loaded this session (not remembered from last time)
- [ ] `balance` checked and reported
- [ ] Creator reference generated once; `character_media_id` reused everywhere
- [ ] Duration ≤15s → N=1
- [ ] Board prompt opens with `@ImageN` matching `medias` order
- [ ] Eight slots, each with explicit POV + distance band; no adjacent pair shares both
- [ ] Both hands named in every slot, idle hand parked
- [ ] De-slop pass queued for the board
- [ ] Seven verbatim `Hard cut to.` markers in the clip prompt
- [ ] **Explicit strong-Australian-accent request in Narrative Summary + Audio line + negatives**
- [ ] Monologue: no banned first word, no AI-tell phrases, every claim carries a concrete
- [ ] Tone fields say "natural, engaged" — the word "hype" appears only inside spoken lines
- [ ] Draft at `mode: fast` / 720p before the 1080p `std` run
- [ ] Frozen-frame QA before anyone sees it
