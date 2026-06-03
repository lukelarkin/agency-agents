# Cascade 03: Proposal

> Discovery call ends. Proposal lands in 90 minutes.
> Win/loss data feeds back to make every future proposal sharper.

---

## Why Pipelines Fail Here

The standard approach: take notes on a call → open a blank doc → write a proposal → review it → send it → hope. Speed kills this pipeline — the prospect has a budget and a problem *right now*. Three days of proposal writing means three days of cooling interest.

The pipeline's failure modes are **F-01 (junk signal)** and **F-03 (too many options)**. The discovery notes are unstructured noise. The proposal has three pricing tiers because you can't decide which one to recommend. The executive summary could describe any business because it doesn't reference this prospect's specific words.

---

## The Cascade Architecture

```
     ┌──────────────────────────────────────────────────┐
     │                                                  │
     ▼                                                  │
  CAPTURE ───→ AMPLIFY ───→ VALIDATE ───→ DEPLOY ───→ OPTIMIZE
  (discovery    (proposal    (quality     (send +      (win/loss
   substrate)   sections)    gate)        follow-up)    analysis)
```

---

## Stage 01 · CAPTURE

**What happens:** Messy discovery call notes become a structured Discovery Substrate.

You don't need perfect notes. Bullet points, fragments, shorthand — the Capture prompt extracts signal: their stated problem (in their words), their unstated problem (what they actually need), urgency drivers, budget signals, decision process, objections, and the emotional charge behind the project.

**Run:** `prompts/proposal-cascade-prompts.md` → Stage 01 prompt

**Input:** Your rough call notes + Proposal Framework substrate
**Output:** Discovery Substrate (structured prospect profile, objection map, recommended approach, pricing rationale)

**Kill condition:** If you can't articulate their problem in one sentence using *their* words, the substrate is too weak. Go back to your notes or schedule a follow-up question before proceeding.

---

## Stage 02 · AMPLIFY

**What happens:** The Discovery Substrate generates a complete proposal in sections — simultaneously.

Not section-by-section. The cascade generates all sections in one pass because they need to be coherent:

1. **Executive summary** — References their specific situation, uses their language
2. **Problem statement** — Their words, their pain, their cost of inaction
3. **Proposed solution** — Your approach, framed against their specific constraints
4. **Scope and deliverables** — Concrete, measurable, no ambiguity
5. **Timeline** — Milestones tied to their deadlines
6. **Investment** — Value established before price appears, recommended tier highlighted
7. **Social proof** — Case study selected by industry/problem match from your Wins Substrate
8. **Next steps** — Specific action + expiration date

The prompt also generates a 3-email follow-up sequence tailored to this prospect's objections.

**Run:** `prompts/proposal-cascade-prompts.md` → Stage 02 prompt

**Input:** Discovery Substrate + Proposal Framework substrate + Wins Substrate
**Output:** Complete proposal draft + 3-email follow-up sequence

---

## Stage 03 · VALIDATE

**What happens:** The proposal runs through a quality gate before you see it.

The Validate prompt scores seven dimensions:

| Dimension | Kill Threshold | What It Catches |
|-----------|---------------|-----------------|
| Personalization | <7/10 | Generic executive summaries, template language |
| Specificity | <7/10 | Vague deliverables ("optimize your marketing") |
| Value framing | <6/10 | Price shown before value is established |
| Objection handling | <6/10 | Known concerns unaddressed |
| CTA clarity | <7/10 | "Let me know" instead of a specific next step |
| Voice fidelity | <7/10 | AI-speak, corporate jargon, not your tone |
| Urgency calibration | <5/10 | Pushy or passive — neither converts |

Sections that fail get auto-repaired using the Discovery Substrate as corrective context.

**Cofactor checkpoint:** You review the validated proposal. If you're rewriting more than two sentences, the Capture stage needs better input — not more of your editing time.

---

## Stage 04 · DEPLOY

**What happens:** Send the proposal + activate the follow-up sequence.

The proposal goes out. The 3 follow-up emails are scheduled:

- **Day 2:** Confirm receipt, restate one key benefit, offer to answer questions
- **Day 5:** Share something genuinely useful (not about the proposal — a relevant insight, article, or case study that demonstrates expertise)
- **Day 8:** Soft close with a specific next step and deadline

Each follow-up references this prospect's specific situation. None of them say "just checking in."

---

## Stage 05 · OPTIMIZE

**What happens:** Win/loss data feeds back to refine the Proposal Framework substrate.

After a proposal resolves (won, lost, or expired), the Optimize prompt processes the outcome:

**If won:** What in the proposal resonated? Which section did they reference? What made them say yes? These signals strengthen the Proposal Framework for future proposals.

**If lost:** Why? Price? Timing? Competitor? Scope mismatch? The specific failure mode gets cataloged. The Proposal Framework adjusts — maybe value framing needs to come earlier, maybe the investment section needs restructuring, maybe the follow-up sequence needs a different cadence.

**If expired (no response):** The worst outcome. The Optimize prompt analyzes: Was the proposal too slow? Was the CTA too passive? Did the follow-up sequence fail to provoke a response? This data is the most valuable because it reveals silent failure modes.

**Run:** `prompts/proposal-cascade-prompts.md` → Stage 05 prompt

**Input:** Proposal outcome + original Discovery Substrate + Proposal Framework substrate
**Output:** Updated Proposal Framework substrate + pattern report

**Feedback inhibition:** After 10 proposals, the Framework knows which sections win deals and which sections are dead weight. After 20, your proposals are structurally optimized for *your* market, not a generic best practice.

---

## Cross-Cascade Connections

**Follow-Up → Proposal:** When a follow-up sequence surfaces an opportunity, the lead context transfers into the Proposal Cascade's Capture stage. You're not starting from scratch — you have months of touchpoint data to draw from.

**Proposal → Onboarding:** When a proposal closes, the Discovery Substrate becomes the Onboarding Cascade's input. The client doesn't repeat themselves. You don't re-ask questions. Context carries over seamlessly.

**Content → Proposal:** Topics that generate inbound leads reveal market language. The Proposal Cascade uses content engagement data to frame value in the words your market already responds to.

---

## Time Investment

| Stage | Time | Frequency |
|-------|------|-----------|
| 01 · Capture | 10 min | Per prospect |
| 02 · Amplify | 10 min | Per prospect |
| 03 · Validate | 5 min | Per prospect |
| 04 · Deploy | 5 min | Per prospect |
| 05 · Optimize | 10 min | Per outcome |
| **Total** | **~40 min/proposal** | |

Previous approach: 3–4 hours per proposal, no feedback, same mistakes repeated.

**Revenue impact:** Speed alone changes outcomes. A proposal that lands in 90 minutes after a discovery call signals competence. A proposal that lands in 3 days signals disorganization. The cascade doesn't just save time — it increases win rate.
