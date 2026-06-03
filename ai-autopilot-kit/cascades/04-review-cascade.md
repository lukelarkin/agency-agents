# Cascade 04: Review

> 30 minutes every Friday. More clarity than most owners get in a quarter.
> The cascade surfaces problems in week one. Pipelines surface them in month three.

---

## Why Pipelines Fail Here

Most agency owners don't have a review process at all. The ones who do follow a pipeline: check Stripe → look at calendar → feel either good or bad → make a vague plan for next week → forget it by Monday.

The failure mode is **F-01: junk signal**. Revenue went up — but was it a fluke or a trend? Leads dropped — but was it seasonal or a system failure? Without structured analysis, you're making decisions on noise.

---

## The Cascade Architecture

```
     ┌──────────────────────────────────────────────────┐
     │                                                  │
     ▼                                                  │
  CAPTURE ───→ AMPLIFY ───→ VALIDATE ───→ DEPLOY ───→ OPTIMIZE
  (gather       (analyze     (human       (time-block   (monthly
   numbers)     + diagnose)   judgment)    next week)    recalibrate)
```

The Review Cascade is unique: it's the **meta-cascade**. It processes data from all other cascades and feeds insights back into each of them.

---

## Stage 01 · CAPTURE

**What happens:** Gather your weekly numbers into the Scorecard Substrate.

You need 8–12 numbers. Not 20. Not "everything you can measure." The specific numbers that tell you whether your business is healthy, growing, or in trouble.

The first time you run this cascade, the Capture prompt helps you identify *your* scorecard metrics. After that, you fill them in every Friday.

**Run (first time):** `prompts/review-cascade-prompts.md` → Stage 01a prompt (Scorecard Builder)
**Run (weekly):** Fill in your Scorecard Substrate

**Input:** Your business context (first time) or this week's raw numbers (weekly)
**Output:** Scorecard Substrate (structured weekly data)

The numbers come from three sources:
- **Your other cascades:** Content performance (Cascade 01), proposals sent/won (Cascade 03), follow-up responses (Cascade 05)
- **Your tools:** Revenue from Stripe/invoicing, cash from banking, hours from time tracking
- **Your judgment:** Client health signals, energy level, qualitative observations

---

## Stage 02 · AMPLIFY

**What happens:** Raw numbers become actionable diagnosis.

The Amplify prompt doesn't just compare this week to last week. It runs four analyses simultaneously:

1. **Trend analysis** — Up, down, or flat against your 4-week moving average. Not just "leads dropped" but "*leads dropped 30% while content output stayed constant, which suggests a content quality problem, not a content volume problem.*"

2. **Correlation mapping** — What's connected? Weeks with 5+ content pieces correlate with 2x leads. Weeks with <3 proposals correlate with revenue dips 3 weeks later. The cascade surfaces these relationships.

3. **Wins extraction** — What went right? Specific, named wins. This prevents burnout and reveals what to replicate.

4. **Concern surfacing** — What needs attention? Ranked by urgency: handle now, plan for next week, or monitor.

**Run:** `prompts/review-cascade-prompts.md` → Stage 02 prompt

**Input:** Scorecard Substrate (this week + last 4 weeks)
**Output:** Diagnostic Report (trends, correlations, wins, concerns, priorities)

---

## Stage 03 · VALIDATE

**What happens:** You apply human judgment to the diagnosis.

This is the most important cofactor checkpoint in the entire kit. The cascade gives you structured analysis. You decide what to do with it.

The Validate stage asks three questions:
1. Do the priorities the cascade identified feel right? (Sometimes the data misses context only you have.)
2. Is there a decision you've been avoiding that the data is now forcing?
3. What does your gut say that the numbers don't capture?

For tough decisions, run the Decision Clarifier:

**Run (optional):** `prompts/review-cascade-prompts.md` → Decision Clarifier prompt

**Input:** The decision + your data + your gut feeling
**Output:** Options analysis, risk assessment, recommendation, first action step

---

## Stage 04 · DEPLOY

**What happens:** Priorities become a time-blocked plan for next week.

The Deploy prompt takes your three priorities and your calendar constraints and produces a specific weekly plan:

- When you'll work on each priority (time blocks)
- What "done" looks like for each one
- Buffer time for reactive work (~20% of each day)
- The "if everything goes sideways" plan (which priority survives?)

**Run:** `prompts/review-cascade-prompts.md` → Stage 04 prompt

**Input:** Your 3 priorities + calendar constraints
**Output:** Time-blocked weekly plan

---

## Stage 05 · OPTIMIZE

**What happens:** Monthly recalibration of the scorecard itself.

On the last Friday of each month, the Optimize prompt analyzes four weeks of data and asks:
- Are you tracking the right metrics? (Some might be vanity metrics in disguise.)
- Are your targets calibrated? (Too easy = no signal. Too hard = demoralizing.)
- What metric should you add? What should you drop?
- How are your 90-day goals tracking? Show the math.

**Run:** `prompts/review-cascade-prompts.md` → Stage 05 prompt

**Input:** Last 4 Scorecard Substrates + 90-day goals
**Output:** Updated Scorecard Substrate (metrics, targets) + Monthly Trend Report + 90-day goal trajectory

**Feedback inhibition:** The scorecard evolves. Month 1 scorecard tracks what you *think* matters. Month 6 scorecard tracks what *actually* predicts outcomes. The cascade teaches you your own business.

---

## Cross-Cascade Connections (The Meta-Cascade)

The Review Cascade is the nervous system of the entire kit. It processes signals from every other cascade and routes insights back:

**→ Content Cascade:** "LinkedIn story posts drove 3x more inbound leads than tactical posts this month. Weight next week's Content Substrate toward story angles."

**→ Proposal Cascade:** "Win rate dropped from 40% to 25% this month. Common factor: proposals over $5K took 3+ days to send. Speed is the issue, not pricing."

**→ Follow-Up Cascade:** "Response rate on the warm sequence dropped 15%. The Day 12 email is underperforming — flag for rewrite in next Optimize cycle."

**→ Onboarding Cascade:** "Two clients this month had scope confusion in week 2. Intake form is missing a question about [specific topic]."

---

## Time Investment

| Stage | Time | Frequency |
|-------|------|-----------|
| 01 · Capture | 10 min | Weekly (Friday) |
| 02 · Amplify | 5 min | Weekly (Friday) |
| 03 · Validate | 10 min | Weekly (Friday) |
| 04 · Deploy | 5 min | Weekly (Friday) |
| 05 · Optimize | 15 min | Monthly (last Friday) |
| **Total** | **~30 min/week** + 15 min/month |

This is an investment, not a cost. The 30 minutes you spend here saves hours of wrong decisions and missed signals across every other cascade.
