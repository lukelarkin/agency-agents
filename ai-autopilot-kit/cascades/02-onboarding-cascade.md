# Cascade 02: Onboarding

> Client signs → professional experience triggers in 10 minutes.
> Every engagement teaches the cascade what to ask next time.

---

## Why Pipelines Fail Here

The standard approach: client signs → you email them questions → they answer → you set up folders → you write a welcome email → you schedule a kickoff. Six stages, different every time, always missing something.

The pipeline's failure mode is **F-04: irreversible failure**. A sloppy onboarding isn't just inefficient — it permanently damages the client's confidence in you. You don't get a second first impression. And the information you forgot to collect in week one haunts you for the entire engagement.

---

## The Cascade Architecture

```
     ┌──────────────────────────────────────────────────┐
     │                                                  │
     ▼                                                  │
  CAPTURE ───→ AMPLIFY ───→ VALIDATE ───→ DEPLOY ───→ OPTIMIZE
  (intake)     (parallel     (client      (kickoff)    (what did
               outputs)      confirms)                  we miss?)
```

---

## Stage 01 · CAPTURE

**What happens:** The client's intake form responses become a structured Client Substrate.

The raw intake data is messy — some answers are detailed, some are one word, some reveal problems the client doesn't know they have. The Capture prompt processes the raw responses into a structured substrate: goals, constraints, red flags, communication preferences, success criteria, and gaps that need clarification.

**Run:** `prompts/onboarding-cascade-prompts.md` → Stage 01 prompt

**Input:** Client's raw intake form responses + your service description
**Output:** Client Substrate (structured profile, red flags, clarification questions, success criteria)

**Kill condition:** If the substrate reveals a scope mismatch (they want X, you deliver Y), the cascade pauses for a human conversation before proceeding. Better to clarify now than unwind later.

---

## Stage 02 · AMPLIFY

**What happens:** The Client Substrate generates five parallel outputs simultaneously.

Not sequentially. In one prompt pass, the cascade produces:

1. **Personalized welcome email** — References their specific situation, not a template
2. **Kickoff call agenda** — Customized to their intake answers, with questions targeting their gaps
3. **Project setup checklist** — Folders, tools, access, documents for this specific engagement
4. **Timeline with milestones** — Based on their deadlines and your process
5. **Internal brief** — Your team's reference doc (or your own reference if you're solo)

**Run:** `prompts/onboarding-cascade-prompts.md` → Stage 02 prompt

**Input:** Client Substrate from Stage 01
**Output:** All 5 documents, each formatted for its destination

---

## Stage 03 · VALIDATE

**What happens:** Stage gate checks for completeness and professionalism.

The Validate prompt checks:
- Does the welcome email reference their specific situation, or could it be for any client?
- Does the agenda address the red flags from the substrate?
- Is the checklist complete for this service type?
- Are there any promises in the timeline you can't keep?
- Does anything sound robotic or templated?

Auto-repair: Failing sections get rewritten with corrective context from the Client Substrate.

**Cofactor checkpoint:** You review the welcome email and agenda before they go to the client. The checklist and internal brief ship without your review — the stage gate handles quality.

---

## Stage 04 · DEPLOY

**What happens:** Send the welcome email. Share the agenda. Execute the checklist. Run the kickoff call.

After the kickoff call, run the Post-Kickoff prompt:

**Run:** `prompts/onboarding-cascade-prompts.md` → Stage 04 prompt (Post-Kickoff)

**Input:** Your rough call notes (bullet points, fragments, shorthand — all fine)
**Output:** Polished summary email with decisions, action items, timeline confirmation, and shared resource links

---

## Stage 05 · OPTIMIZE

**What happens:** Post-engagement feedback refines the intake form and onboarding flow.

After the first month (or at project completion), the Optimize prompt asks:
- What information did you wish you'd collected upfront?
- What questions confused clients or got useless answers?
- What was missing from the welcome sequence?
- What surprised you about this engagement that you should screen for next time?

This feedback modifies the **Intake Substrate** — the master intake form template. Every client you onboard makes the intake form smarter for the next one.

**Run:** `prompts/onboarding-cascade-prompts.md` → Stage 05 prompt

**Input:** Your post-engagement notes + original Client Substrate + Intake Substrate
**Output:** Updated Intake Substrate + updated welcome sequence recommendations

**Feedback inhibition:** Questions that consistently produce useless answers get cut. Questions you keep wishing you'd asked get added. After 10 clients, your intake form is surgically precise.

---

## Cross-Cascade Connections

**Proposal → Onboarding:** When a proposal closes, the Proposal Cascade's discovery substrate transfers directly into the Onboarding Cascade's Capture stage. The client doesn't re-answer questions you already discussed. Context carries over.

**Onboarding → Content:** Patterns in client problems become content substrate. "Every client asks about X" becomes "write about X." The onboarding cascade reveals what your market actually cares about.

**Onboarding → Review:** Client health signals (response time, enthusiasm, scope questions) feed into the Weekly Review Cascade. Problems surface in your Friday review before they become crises.

---

## Time Investment

| Stage | Time | Frequency |
|-------|------|-----------|
| 01 · Capture | 5 min | Per client |
| 02 · Amplify | 5 min | Per client |
| 03 · Validate | 5 min | Per client |
| 04 · Deploy (kickoff + summary) | 10 min | Per client |
| 05 · Optimize | 10 min | Per client (post-engagement) |
| **Total** | **~35 min/client** | |

Previous approach: 3–5 hours per client, inconsistent, always missing something.
