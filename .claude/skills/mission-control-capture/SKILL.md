---
name: mission-control-capture
description: >-
  Scans the current conversation for gaps, ideas, build items, blind spots, and
  deferred decisions, then writes them to Irfan's Mission Control dashboard
  (storage key irfan-mc-v2). Use when the user says "update mission control",
  "add to mission control", "add to MC", "update the MC", "capture this for
  mission control", or "wrap this up for mission control"; at the end of a
  brainstorm or planning session; when a gap, blind spot, or deferred decision
  is identified; or when Irfan says "we should do that later", "park that", or
  "don't forget this". This is for what needs to be built or was discovered/
  deferred — NOT for what has already been built and deployed (that goes in
  SYSTEM_MAP.md via talkmate-system-map-update).
---

# mission-control-capture

## What this skill does

Scans the current conversation for gaps, ideas, build items, blind spots, and deferred decisions, then writes them directly to Irfan's Mission Control dashboard (storage key `irfan-mc-v2`).

This is NOT a replacement for SYSTEM_MAP.md. The distinction is strict:

- **SYSTEM_MAP.md** = what has been built, how it works, schema, routes, env vars, session history
- **Mission Control** = what needs to be built, gaps found, ideas to explore, deferred decisions, recurring reviews

If something is done and deployed → SYSTEM_MAP.
If something is yet to be done, discovered, or deferred → Mission Control.

-----

## Triggers

**Mandatory triggers (always run this skill):**

- "update mission control"
- "add to mission control"
- "mission control update"
- "add to MC"
- "update the MC"
- "capture this for mission control"

**Strong triggers (use when intent is clear):**

- At the end of any brainstorm or planning session
- When a gap or blind spot is explicitly identified in the conversation
- When a decision is deferred to a later session
- When Irfan says "we should do that later", "park that", "don't forget this"
- When a build item is identified but not scheduled yet
- "what should we add from this conversation?"
- "wrap this up for mission control"

-----

## Field definitions

Every item needs these fields:

|Field     |Options                                                                     |Rule                                                                                                          |
|----------|----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
|`title`   |Short string                                                                |Action-oriented, max ~80 chars. Start with a verb where possible.                                             |
|`desc`    |Longer string                                                               |Full context from the conversation. Enough that Irfan understands it in 3 weeks without re-reading the thread.|
|`priority`|`now` / `next` / `later` / `recurring`                                      |See guide below                                                                                               |
|`dept`    |`product` / `marketing` / `sales` / `success` / `ops`                       |Use `product` for any engineering or technical item                                                           |
|`biz`     |`talkmate` / `foodfomo` / `general`                                         |Default `talkmate` unless clearly another business                                                            |
|`cadence` |`daily` / `per-session` / `weekly` / `fortnightly` / `monthly` / `quarterly`|Only required when `priority` is `recurring`                                                                  |

**Priority guide:**

- `now` = needs to happen this week, actively blocking something, or time-sensitive
- `next` = important but not urgent, 2–4 weeks horizon
- `later` = good idea, not urgent, backlog
- `recurring` = something that should be reviewed on a regular cadence (weekly reviews, monthly MRR check, etc.)

When in doubt, default to `later`. It's better to park something correctly than to inflate the NOW column.

-----

## Workflow

### Step 1 — Scan the conversation

Look back through the full thread. Extract anything that matches:

- An explicit build item or feature request
- A gap, blind spot, or missing piece identified
- A decision that was deferred or needs follow-up
- An idea that was mentioned but not acted on
- A recurring review or process that should happen on a cadence
- Any "we should do this later" or "don't forget" moments

Do NOT capture:

- Things that are already in the Mission Control dashboard (Irfan may mention them in passing)
- Things that are already in SYSTEM_MAP as completed sessions
- Pure factual information with no action attached

### Step 2 — Format the items

For each item, fill out all required fields. Write the `desc` field generously — include the specific context from the conversation (why this matters, what triggered it, any relevant technical details).

### Step 3 — Present for review (when 3+ items)

If capturing 3 or more items, show a quick preview list before writing:

```
Found [N] items to add to Mission Control:

⚡ NOW — [title] ([dept]/[biz])
→ NEXT — [title] ([dept]/[biz])
○ LATER — [title] ([dept]/[biz])
↻ RECURRING — [title] ([dept]/[biz])

Adding all of these — say 'skip [item]' to exclude any, or 'add them all' to confirm.
```

If capturing 1–2 items, skip the preview and write immediately.

### Step 4 — Build and render the write artifact

Create a React artifact that:

1. Reads existing items from storage key `irfan-mc-v2`
2. Appends the new items (each with a unique ID, `done: false`, `createdAt: new Date().toISOString()`)
3. Writes the merged array back to `irfan-mc-v2`
4. Shows a clean confirmation with the count and item titles

Use this artifact template:

```jsx
import { useState, useEffect } from "react";

const NEW_ITEMS = [
  // items go here — populated by the skill at runtime
];

export default function MCUpdate() {
  const [status, setStatus] = useState("writing");
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        let existing = [];
        try {
          const r = await window.storage.get("irfan-mc-v2");
          if (r) existing = JSON.parse(r.value);
        } catch {}

        const stamped = NEW_ITEMS.map((item, i) => ({
          ...item,
          id: `mc-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          done: false,
          createdAt: new Date().toISOString()
        }));

        const merged = [...existing, ...stamped];
        await window.storage.set("irfan-mc-v2", JSON.stringify(merged));
        setCount(stamped.length);
        setStatus("done");
      } catch (e) {
        setStatus("error");
      }
    })();
  }, []);

  return (
    <div style={{
      background: "#040c14", color: "#c8dbe8", fontFamily: "monospace",
      padding: 24, borderRadius: 8, border: "1px solid #0d2030", minHeight: 120,
      display: "flex", flexDirection: "column", gap: 12
    }}>
      <div style={{ color: "#E8622A", fontWeight: "bold", fontSize: 13, letterSpacing: "0.08em" }}>
        MISSION CONTROL
      </div>

      {status === "writing" && (
        <div style={{ color: "#3a6070", fontSize: 11 }}>Writing to irfan-mc-v2...</div>
      )}

      {status === "done" && (
        <>
          <div style={{ color: "#22C55E", fontSize: 12 }}>
            ✓ {count} item{count !== 1 ? "s" : ""} added successfully
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {NEW_ITEMS.map((item, i) => {
              const colors = { now: "#E8622A", next: "#F59E0B", later: "#22C55E", recurring: "#60A5FA" };
              return (
                <div key={i} style={{ fontSize: 10, color: "#5a8a9a", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: colors[item.priority] || "#E8622A", minWidth: 60 }}>
                    {item.priority.toUpperCase()}
                  </span>
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
          <div style={{ color: "#1e3040", fontSize: 10, marginTop: 4 }}>
            Open Mission Control to see all items
          </div>
        </>
      )}

      {status === "error" && (
        <div style={{ color: "#EF4444", fontSize: 11 }}>
          Write failed — check storage access
        </div>
      )}
    </div>
  );
}
```

### Step 5 — Confirm

After the artifact renders and shows success, briefly confirm what was added. No long summaries needed.

-----

## Rules

- **Never update SYSTEM_MAP from this skill.** If something was built and deployed, that goes in SYSTEM_MAP via the `talkmate-system-map-update` skill instead.
- **Never duplicate.** If the user mentions something that was clearly already captured earlier in the same session, skip it.
- **Context over brevity in the `desc` field.** The whole point is that Irfan shouldn't need to re-read the thread. Write enough that the item is self-explanatory in 3 weeks.
- **Default priority is `later`** when unclear. Don't inflate NOW.
- **One artifact, all items.** Don't create multiple write artifacts in the same operation. Batch everything into one.
- **If Irfan gives you a single explicit item** ("add this: X, priority NOW, marketing"), skip the preview step and write immediately.

-----

## Chaining with other skills

This skill chains naturally with:

- `talkmate-system-map-update` — run that for what was built, this for what was identified
- `build-brief` — if a build item from Mission Control is being specced out, pull it from here
- `compound-engineering` — at the end of a ce-review phase, run this to capture any gaps found

-----

## Example trigger + output

**User:** "Okay, capture this conversation for mission control."

**Claude (Step 1 scan):** Reviews thread, finds 4 items.

**Claude (Step 2-3 preview):**

```
Found 4 items:

⚡ NOW — Install GTM + Meta Pixel + GA4 on website (marketing/talkmate)
→ NEXT — UTM framework brief for Jade and reps (marketing/talkmate)
○ LATER — Schema markup on talkmate.com.au (marketing/talkmate)
↻ RECURRING — Weekly demo call transcript review (product/talkmate, weekly)

Adding all — say 'skip [item]' to exclude any.
```

**Claude (Step 4):** Renders the write artifact. Confirms success.
