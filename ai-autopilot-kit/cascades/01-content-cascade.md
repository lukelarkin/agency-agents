# Cascade 01: Content

> One business insight per week. Ten platform-native outputs. Zero slop.
> The cascade compounds — week 12 output is unrecognizable from week 1.

---

## Why Pipelines Fail Here

The standard approach: brainstorm ideas → write posts → schedule → repeat. Five stages, zero feedback, one voice profile written on day one and never updated.

By week six, everything reads the same. The voice profile is stale. The "content calendar" is a fiction you stopped following in week three. You're generating more but shipping the same amount because the review stage is bottlenecked on you.

The pipeline's failure mode is **F-02: throughput plateau**. Inputs increase, outputs stay flat, and you spend more time editing AI drafts than you spent writing the originals.

---

## The Cascade Architecture

```
     ┌──────────────────────────────────────────────────┐
     │                                                  │
     ▼                                                  │
  CAPTURE ───→ AMPLIFY ───→ VALIDATE ───→ DEPLOY ───→ OPTIMIZE
  (insight)    (variants)   (stage gate)   (ship)      (learn)
     │                                                  │
     │            ┌── LinkedIn (native)                 │
     │            ├── Instagram (native)                │
     │  AMPLIFY ──┤                                     │
     │            ├── X / Twitter (native)              │
     │            ├── Email (native)                    │
     │            └── Blog / Long-form (native)         │
     │                                                  │
     └──────── feedback inhibition ─────────────────────┘
```

---

## Stage 01 · CAPTURE

**What happens:** A business event becomes structured substrate.

You don't start with "what should I post about?" You start with something that actually happened — a client win, a mistake, a conversation, a pattern you noticed, a question someone asked. One real event.

The Capture prompt extracts the signal: the core insight, the emotional charge, the tension, the lesson. It produces a **Content Substrate** — a structured document that every downstream stage consumes.

**Run:** `prompts/content-cascade-prompts.md` → Stage 01 prompt

**Input:** One sentence about a real business event + your Content DNA substrate
**Output:** Content Substrate (core insight, 7 angles, 10 hooks, talking points, tension map)

**Kill condition:** If the substrate has no tension (nothing surprising, contrarian, or useful), go back and pick a different event. A substrate without tension produces slop downstream — guaranteed.

**Substrate channeling:** The Content Substrate output format exactly matches Stage 02's input format. No reformatting needed.

---

## Stage 02 · AMPLIFY

**What happens:** One substrate, many platform-native variants. In parallel.

This is not "rewrite the same post for different platforms." Each output is a native adaptation that respects the physics of its platform:

- **LinkedIn:** Professional context, story arc, longer form, comment-bait ending
- **Instagram:** Visual-first, carousel or short caption, hashtag strategy, save-worthy
- **X/Twitter:** Compressed, thread-native, quotable fragments, engagement hooks
- **Email:** Personal tone, one reader, story→lesson→CTA, reply-worthy
- **Blog:** SEO substrate, long-form argument, internal linking, evergreen structure

The prompt produces all five in one pass. Each one references the same core insight but speaks the language of its platform.

**Run:** `prompts/content-cascade-prompts.md` → Stage 02 prompt

**Input:** Content Substrate from Stage 01 + Content DNA
**Output:** 5 platform-native drafts, each formatted for its destination

**Signal amplification:** One insight → five outputs. Not copies. Adaptations.

---

## Stage 03 · VALIDATE

**What happens:** The stage gate catches problems before they ship.

The Validate prompt runs each draft through kill conditions:

1. **Voice fidelity** — Does this sound like the Content DNA, or has it drifted into generic AI tone?
2. **Platform nativity** — Would this blend in on the platform, or does it read like a cross-post?
3. **Hook strength** — Does the first line stop a scroll, or does it start with "I've been thinking about..."?
4. **Slop detection** — Any filler phrases, empty calories, or statements that could apply to any business?
5. **CTA clarity** — Is there a specific action, or does it trail off?

Drafts that fail get **auto-repaired**: the Validate prompt rewrites the failing section with corrective context. Drafts that fail twice get **killed** and replaced from an alternate angle in the substrate.

**Run:** `prompts/content-cascade-prompts.md` → Stage 03 prompt

**Input:** All 5 drafts from Stage 02 + Content DNA + kill conditions
**Output:** 5 validated drafts (passed, repaired, or replaced) + validation report

**Cofactor checkpoint:** This is where you review. You see only what passed the gate. Your job is approval, not editing. If you're rewriting more than one sentence per piece, the upstream stages need adjustment — not more of your time.

---

## Stage 04 · DEPLOY

**What happens:** Schedule, send, publish.

This stage is mechanical. The creative work is done. You take the validated outputs and schedule them using your platform of choice.

**Recommended cadence:**
- Monday: Create (Stages 01–03, ~60 minutes total)
- Tuesday: LinkedIn story post
- Wednesday: X thread + Instagram post
- Thursday: LinkedIn tactical post + Email newsletter
- Friday: Blog post + Instagram post

**Run:** No prompt needed. Use your scheduling tool. Refer to the cadence above.

---

## Stage 05 · OPTIMIZE

**What happens:** Performance data flows back upstream. The cascade learns.

On Friday, you feed engagement data into the Optimize prompt. It doesn't just tell you "what worked" — it modifies your upstream substrates:

- **Content DNA gets refined:** Voice patterns that generated engagement get amplified. Patterns that fell flat get dampened.
- **Angle preferences get updated:** The cascade learns which of the 7 angles consistently perform and weights future substrates toward them.
- **Hook patterns get ranked:** First lines that stopped scrolls get cataloged. Future Amplify stages draw from this library.
- **Kill conditions get calibrated:** If the Validate stage is passing content that underperforms, the thresholds tighten. If it's killing content that would have worked, they loosen.

**Run:** `prompts/content-cascade-prompts.md` → Stage 05 prompt

**Input:** This week's engagement metrics + Content DNA + this week's Content Substrate
**Output:** Updated Content DNA (the substrate evolves) + performance report + recommendations for next week's Capture

**Feedback inhibition:** This is the mechanism that makes the cascade antifragile. Week 1 output is good. Week 12 output is dialed — because the system has learned from 11 cycles of real performance data.

---

## Cross-Cascade Connections

**Content → Follow-Up:** High-performing content becomes value-add material for follow-up sequences. When a post gets strong engagement, the Follow-Up Cascade uses it as a touchpoint: "I wrote about [topic] recently and thought of you."

**Content → Proposal:** Content themes that generate inbound leads reveal what your market cares about. The Proposal Cascade uses these signals to frame value in the prospect's language.

**Review → Content:** The Weekly Review Cascade identifies which topics drove pipeline movement. That data feeds back into next week's Capture stage: create more substrate around the themes that generate revenue, not just engagement.

---

## The Compound Effect

| Week | What Happens |
|------|-------------|
| 1 | First cycle. Content DNA is rough. Output is good, not great. |
| 2–3 | Optimize stage starts refining. Voice gets sharper. Hooks get stronger. |
| 4–6 | Feedback data accumulates. You know which angles work. Capture gets faster. |
| 7–9 | The cascade is tuned. 60 minutes produces better content than 8 hours used to. |
| 10–12 | Compounding kicks in. Your content is recognizably *yours*. Leads increase. |
| 13+ | The system runs. You spend your time on the cofactor checkpoint and Capture. Everything else is the cascade. |

---

## Time Investment

| Stage | Time | Frequency |
|-------|------|-----------|
| 01 · Capture | 10 min | Weekly (Monday) |
| 02 · Amplify | 15 min | Weekly (Monday) |
| 03 · Validate | 10 min | Weekly (Monday) |
| 04 · Deploy | 10 min | Weekly (Monday) |
| 05 · Optimize | 15 min | Weekly (Friday) |
| **Total** | **~60 min/week** | |

Previous approach: 8–10 hours/week for less output, no feedback, no compounding.
