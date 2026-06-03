# Review Cascade — Stage Prompts

> Prompts for Cascade 04: Review.
> The meta-cascade. Processes signals from all other cascades.

---

## Stage 01a · CAPTURE (One-Time) — Scorecard Builder

> Run once at setup. Identifies the 8–12 metrics that actually matter for YOUR business.

### Prompt

```
Help me build a CEO Scorecard — the 8–12 weekly metrics that tell me if my business is healthy, growing, or in trouble.

<business-context>
Business type: [e.g., marketing agency, web design studio, consulting firm]
Business model: [project-based / retainer / productized / mix]
Monthly revenue range: $[X]–$[Y]
Team size: [just me / 2–5 / 5+]
Revenue sources: [list your revenue streams]
</business-context>

<goals>
90-day goals:
1. [SPECIFIC, MEASURABLE GOAL]
2. [SPECIFIC, MEASURABLE GOAL]
3. [SPECIFIC, MEASURABLE GOAL]
</goals>

<signals>
What a good week looks like: [DESCRIBE]
What a bad week looks like: [DESCRIBE]
What you worry about at 2am: [DESCRIBE]
</signals>

Build a SCORECARD SUBSTRATE:

## SCORECARD SUBSTRATE — [Name]

### METRICS (8–12 total)

For each metric:
- **Name**: [clear, specific]
- **Category**: Revenue / Pipeline / Marketing / Client Health / Operations
- **How to measure**: [where to find this number — which tool, which report]
- **Type**: Leading indicator (predicts future) or Lagging indicator (measures past)
- **Target**: [specific weekly target]
- **Warning threshold**: [what number signals a problem]

### REVENUE & CASH (2–3 metrics)
[Select the ones that matter for this business model]

### PIPELINE & SALES (2–3 metrics)
[Select the ones that matter]

### MARKETING & LEADS (2–3 metrics)
[Select the ones that matter]

### CLIENT HEALTH (1–2 metrics)
[Select the ones that matter]

### OPERATIONS (1–2 metrics)
[Select the ones that matter]

### ALARM COMBINATIONS
[Specific metric combinations that signal problems. E.g.:]
- "If leads drop 2 weeks in a row while content output stayed high → content quality problem, not volume"
- "If hours worked increase but revenue is flat → pricing or efficiency problem"
- "If proposals sent increase but win rate drops → qualification problem"

### VANITY METRIC WARNING
[List 3–5 metrics this business owner might be tempted to track that don't actually drive decisions. Explain why each one is noise.]
```

---

## Stage 02 · AMPLIFY — Weekly Diagnostic

> Run every Friday with your filled-in scorecard.

### Prompt

```
Analyze my weekly business performance. Don't sugarcoat.

<scorecard-substrate>
[PASTE YOUR SCORECARD SUBSTRATE — the metric definitions and targets]
</scorecard-substrate>

<this-week>
Week of: [DATE]
[Fill in each metric from your scorecard:]
- Revenue collected: $[X]
- Revenue invoiced: $[X]
- New leads: [X]
- Discovery calls: [X]
- Proposals sent: [X]
- Proposals won: [X]
- Content published: [X]
- Email open rate: [X]%
- Active clients: [X]
- Hours worked: [X]
- Billable hours: [X]
- Cash in bank: $[X]
- Energy level (1–10): [X]
[Add any metrics from your scorecard not listed above]
</this-week>

<previous-weeks>
[Paste last 3–4 weeks of data. Or "first week — no comparison."]
</previous-weeks>

<notable-events>
[Anything unusual: lost a client, big win, launched something, got sick, changed pricing, etc.]
</notable-events>

Produce:

## WEEKLY DIAGNOSTIC — Week of [Date]

### PERFORMANCE SUMMARY
[One paragraph. Up, down, or flat vs. last week AND 4-week average. Be specific with percentages. Not "leads improved" — "leads up 30% vs. last week, 15% above 4-week average."]

### TREND SIGNALS
[For each metric, indicate: ↑ improving / ↓ declining / → flat / ⚠ warning threshold hit]
[Include the trend direction AND velocity — is it accelerating or decelerating?]

### CORRELATION MAP
[What's connected? Surface relationships between metrics:]
- [e.g., "Weeks with 5+ content pieces correlate with 2x leads the following week"]
- [e.g., "Proposals sent within 48 hours of discovery call have 60% win rate vs. 25% for 3+ day delay"]

### 3 WINS
[Specific, named wins. Not "had a good week" — "closed the $5K proposal for [Client] that was at risk of expiring." Even small wins count — this prevents burnout.]
1. [Win]
2. [Win]
3. [Win]

### 3 CONCERNS
[Ranked by urgency]
1. [Concern] — Urgency: [A: handle this week / B: plan for next week / C: monitor]
   → Suggested action: [specific]
2. [Concern] — Urgency: [A/B/C]
   → Suggested action: [specific]
3. [Concern] — Urgency: [A/B/C]
   → Suggested action: [specific]

### 3 PRIORITIES FOR NEXT WEEK
[Specific, actionable, time-bound. Connected to the concerns or 90-day goals.]
1. [Priority] — Definition of done: [what "complete" looks like]
2. [Priority] — Definition of done: [what "complete" looks like]
3. [Priority] — Definition of done: [what "complete" looks like]

### ONE BIG INSIGHT
[Something the owner might not have noticed. A pattern, a correlation, a strategic observation that changes how they think about next week.]

### CROSS-CASCADE SIGNALS
[Insights that should feed back into other cascades:]
- → Content Cascade: [e.g., "Story posts drove 3x more leads than tactical — adjust next week's Tension Map"]
- → Proposal Cascade: [e.g., "Win rate dropped — review proposal speed and value framing"]
- → Follow-Up Cascade: [e.g., "3 warm leads went cold — reactivation needed"]
```

---

## Decision Clarifier (Optional)

> Use when the weekly diagnostic surfaces a tough decision.

### Prompt

```
Help me think through a business decision.

<decision>
[DESCRIBE THE DECISION IN ONE SENTENCE]
</decision>

<context>
[RELEVANT BACKGROUND — what led to this decision point]
</context>

<data>
[ANY NUMBERS, FACTS, OR EVIDENCE]
</data>

<gut-feeling>
[WHAT DOES YOUR INSTINCT SAY — and why might it be wrong]
</gut-feeling>

Walk through:

1. REFRAME — What's the actual decision? (Often different from what we think it is.)
2. OPTIONS — All realistic options, including "do nothing" and "do the opposite."
3. ANALYSIS — For each option: best case, worst case, most likely, reversibility.
4. FRIEND TEST — If a trusted friend described this situation, what would I advise?
5. 10/10/10 — How will I feel about this in 10 minutes? 10 months? 10 years?
6. RECOMMENDATION — Which option and why.
7. FIRST ACTION — The smallest possible next step, doable today.

Challenge my gut feeling if the data suggests otherwise.
```

---

## Stage 04 · DEPLOY — Weekly Plan Generator

### Prompt

```
Turn my priorities into a time-blocked weekly plan.

<priorities>
1. [PRIORITY 1 — from the diagnostic]
2. [PRIORITY 2]
3. [PRIORITY 3]
</priorities>

<calendar>
Existing commitments: [LIST CLIENT MEETINGS, RECURRING CALLS, ETC.]
Days unavailable: [ANY DAYS OFF]
Most productive time: [MORNING / AFTERNOON]
Content creation day: [WHICH DAY — usually Monday]
Review day: [WHICH DAY — usually Friday]
Daily follow-up block: [WHEN]
</calendar>

<available-hours>
~[X] hours available for priority work this week
</available-hours>

Produce:

## WEEKLY PLAN — Week of [Date]

For each day (Mon–Fri):
### [DAY]
- [TIME]: [Activity] — [which priority this serves]
- [TIME]: [Activity]
- [TIME]: Buffer (20% of each day for reactive work)

### NON-NEGOTIABLES
[3 things that MUST happen this week, even if everything else falls apart]

### IF THINGS GO SIDEWAYS
[If you only get 50% of planned time, which tasks survive? Rank them.]

### FIRST ACTION MONDAY MORNING
[The very first thing to do when you sit down. Make it small and specific so there's zero friction to start.]
```

---

## Stage 05 · OPTIMIZE — Monthly Recalibration

> Run on the last Friday of each month.

### Prompt

```
Monthly recalibration of my scorecard and business trajectory.

<scorecard-substrate>
[PASTE YOUR SCORECARD SUBSTRATE]
</scorecard-substrate>

<four-weeks-data>
Week 1: [date] — [all metrics]
Week 2: [date] — [all metrics]
Week 3: [date] — [all metrics]
Week 4: [date] — [all metrics]
</four-weeks-data>

<90-day-goals>
1. [GOAL] — Target: [SPECIFIC OUTCOME]
2. [GOAL] — Target: [SPECIFIC OUTCOME]
3. [GOAL] — Target: [SPECIFIC OUTCOME]
</90-day-goals>

Produce:

## MONTHLY TREND REPORT

### Trajectory
[For each metric: improving, declining, or flat. Include percentage change over 4 weeks. Show the math.]

### 90-Day Goal Check
[For each goal: on track? Behind? Ahead? What needs to change to hit the target? Be specific.]

### Scorecard Audit
- Metrics to ADD: [anything missing that would improve decision-making]
- Metrics to DROP: [anything that's noise — tracked but never acted on]
- Targets to ADJUST: [any targets that are miscalibrated — too easy or impossibly hard]

### Energy & Sustainability
[Is energy trending up or down? Is there a correlation with hours worked? Warning signs of burnout?]

### Strategic Recommendations
- START: [one thing to begin doing next month]
- STOP: [one thing to stop doing next month]
- DOUBLE DOWN: [one thing that's clearly working — invest more]

### Updated Scorecard Substrate
[Output the full updated scorecard with any changes applied]
```
