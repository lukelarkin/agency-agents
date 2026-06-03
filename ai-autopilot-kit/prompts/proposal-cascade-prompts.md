# Proposal Cascade — Stage Prompts

> Prompts for Cascade 03: Proposal.
> Discovery call → structured substrate → complete proposal → validated → sent with follow-up.

---

## Stage 01 · CAPTURE — Discovery Substrate Generator

> Run immediately after a discovery call.

### Prompt

```
Process my discovery call notes into a structured Discovery Substrate. This substrate will generate the entire proposal — every section needs to be informed by this document.

<proposal-framework>
[PASTE YOUR PROPOSAL FRAMEWORK SUBSTRATE — or describe your services, pricing, and differentiators]
</proposal-framework>

<call-notes>
[PASTE YOUR RAW DISCOVERY CALL NOTES — bullet points, fragments, shorthand, quotes]
</call-notes>

Produce a DISCOVERY SUBSTRATE with EXACTLY this structure:

## DISCOVERY SUBSTRATE — [Prospect Name], [Company]

### PROSPECT PROFILE
- Name: [full name]
- Company: [company]
- Role: [title]
- Industry: [industry]
- Company size: [employees/revenue if known]

### STATED PROBLEM
[Their problem in THEIR EXACT WORDS. Quote them. This goes directly into the proposal.]

### ACTUAL NEED
[What they actually need vs. what they said. What's the problem behind the problem?]

### URGENCY DRIVERS
[Why now? What's the trigger — a deadline, a lost client, a new competitor, a budget that expires, a board meeting?]

### GOALS
[What does success look like to THEM? In their words. Specific, measurable if possible.]

### BUDGET SIGNALS
[What they said or implied about budget. Direct quotes if available. "We've budgeted around $X" or "we're comparing a few options" or no signal at all.]

### DECISION PROCESS
- Decision maker(s): [who]
- Timeline for decision: [when]
- Other options they're considering: [competitors, DIY, do nothing]
- Internal politics: [any stakeholder dynamics]

### OBJECTION MAP
[Every concern, hesitation, or pushback they expressed or implied:]
- Objection 1: [what they said] → Reframe: [how to address it in the proposal]
- Objection 2: [what they said] → Reframe: [how to address it]
- Objection 3: [what they said] → Reframe: [how to address it]

### EMOTIONAL CHARGE
[What's the emotional undercurrent? Frustration? Excitement? Skepticism? Fear? Understanding this shapes the proposal tone.]

### RECOMMENDED APPROACH
- Service/package: [what you'd recommend]
- Price: $[amount]
- Timeline: [weeks/months]
- Key deliverables: [list]
- Rationale: [why this approach for this prospect]

### KEY QUOTES
[3–5 exact phrases they used that should appear in the proposal. Using their language signals that you listened.]
```

### Stage Gate
- [ ] KEY QUOTES has at least 3 entries (if you can't quote them, you didn't listen closely enough)
- [ ] OBJECTION MAP has at least 2 entries (every prospect has objections, even if unspoken)
- [ ] EMOTIONAL CHARGE is specific (not just "interested" — what kind of interested?)

---

## Stage 02 · AMPLIFY — Proposal Generator

> Run immediately after Capture.

### Prompt

```
Generate a complete proposal from this Discovery Substrate. Every section should feel like it was written specifically for this prospect — because it was.

<discovery-substrate>
[PASTE DISCOVERY SUBSTRATE FROM STAGE 01]
</discovery-substrate>

<proposal-framework>
[PASTE YOUR PROPOSAL FRAMEWORK — About Us, differentiators, process description, terms]
</proposal-framework>

<wins-substrate>
[PASTE YOUR WINS SUBSTRATE — past results, case studies, testimonials. Or list your best 3–5 results.]
</wins-substrate>

Generate:

## PROPOSAL — [Project Name]
**Prepared for:** [Prospect Name], [Company]
**Date:** [Date]
**Valid until:** [Date + 14 days]

---

### EXECUTIVE SUMMARY
[3–4 sentences. Reference their specific situation using their quotes from the substrate. State the outcome they want. State your confidence in delivering it. This paragraph should make them feel understood.]

### THE CHALLENGE
[Their problem, in their words. Reference quotes from the Discovery Substrate. Include the cost of inaction — what happens if they don't solve this.]

### PROPOSED SOLUTION
Overview: [2–3 sentences: your approach and why it fits their specific constraints]

Phase 1: [Name] — Weeks [X–Y]
- What we do: [specific deliverables]
- What you get: [tangible outcome]

Phase 2: [Name] — Weeks [X–Y]
- What we do: [specific deliverables]
- What you get: [tangible outcome]

[Add phases as needed]

### SCOPE & DELIVERABLES
[Clear, specific, no ambiguity. "4 blog posts per month" not "content creation." Each deliverable is measurable.]

### TIMELINE
| Week | Milestone | Deliverable |
[Build from the substrate's timeline and urgency drivers]

### YOUR INVESTMENT
[Establish value BEFORE showing price. Reference the cost of their current problem. Then present pricing.]

Recommended: [Package name] — $[Price]
- [Everything included]
- [Why this tier fits their situation specifically]

[Optional: Include 2–3 tiers if the substrate suggests price sensitivity. Highlight the recommended option.]

Payment terms: [your terms]

> This proposal is valid for 14 days. After [date], pricing and availability may change.

### WHY [YOUR COMPANY]
[Tailored to what matters to THIS prospect. Reference their objections and preemptively address them. Include the most relevant case study from your Wins Substrate — matched by industry, problem, or company size.]

### WHAT OUR CLIENTS SAY
[Most relevant testimonial. If you don't have an exact match, use the closest one and frame it properly.]

### NEXT STEPS
1. [Specific action] — reply "approved" or sign below
2. Invoice sent within 24 hours
3. Intake form sent immediately
4. Kickoff call within 48 hours

---

## FOLLOW-UP SEQUENCE

Also generate 3 follow-up emails, each referencing this specific prospect:

**Email 1 (Day 2):** Confirm receipt. Restate one key benefit using their language. Under 100 words.

**Email 2 (Day 5):** Share something genuinely useful — NOT about the proposal. A relevant insight, article, or observation about their industry. Under 150 words. Subtly reinforces your expertise.

**Email 3 (Day 8):** Soft close. Acknowledge they're busy. Present a specific next step with a date. Create gentle urgency (your calendar, their timeline, proposal expiration). Under 100 words. End with a direct question.
```

---

## Stage 03 · VALIDATE — Proposal Quality Gate

### Prompt

```
Quality-check this proposal before it ships.

<discovery-substrate>
[PASTE DISCOVERY SUBSTRATE]
</discovery-substrate>

<proposal-draft>
[PASTE COMPLETE PROPOSAL FROM STAGE 02]
</proposal-draft>

Score each dimension (1–10). Any dimension below the threshold triggers auto-repair.

| Dimension | Threshold | What You're Checking |
|-----------|-----------|---------------------|
| Personalization | 7 | Does the exec summary reference their specific situation? Could you swap client names and have it still work? |
| Specificity | 7 | Are deliverables concrete? ("4 blog posts" not "content creation") |
| Value framing | 7 | Is value established BEFORE price appears? Would a reader feel the investment is justified? |
| Objection handling | 6 | Does the proposal preemptively address concerns from the Objection Map? |
| CTA clarity | 7 | Is the next step crystal clear? Specific action, specific timeline? |
| Voice fidelity | 6 | Does this sound like a human wrote it? No AI-speak, no corporate jargon? |
| Quote integration | 6 | Are the prospect's own words woven into the proposal naturally? |

For any dimension below threshold:
- Diagnose what's wrong (specific sentences)
- Rewrite those sections using the Discovery Substrate as corrective context
- Leave passing sections untouched

Output: Validated proposal + score report.
```

---

## Stage 05 · OPTIMIZE — Win/Loss Feedback

> Run after a proposal resolves.

### Prompt

```
A proposal just resolved. Process the outcome to improve future proposals.

<outcome>
Result: [WON / LOST / EXPIRED (no response)]
Prospect: [Name, Company]
Deal size: $[Amount]
If won — what they said when accepting: [any feedback]
If lost — why: [their stated reason, or your best assessment]
If expired — your theory on why: [what you think happened]
</outcome>

<discovery-substrate>
[PASTE THE ORIGINAL DISCOVERY SUBSTRATE]
</discovery-substrate>

<current-proposal-framework>
[PASTE YOUR PROPOSAL FRAMEWORK SUBSTRATE]
</current-proposal-framework>

Produce:

## WIN/LOSS ANALYSIS

### What happened
[2–3 sentence summary]

### Root cause
[If won: what specifically tipped the decision. If lost/expired: what specifically failed.]

### Pattern match
[Does this match any pattern from previous wins/losses? Is this a recurring theme?]

## PROPOSAL FRAMEWORK UPDATES

### Sections to strengthen
[Specific sections that need adjustment based on this outcome]

### Sections that worked
[What to keep doing — reinforce successful patterns]

### Objection handling updates
[New objections to add to the framework, or reframes that need improvement]

### Follow-up sequence updates
[Did the follow-up emails work? What to adjust?]

## UPDATED WINS SUBSTRATE
[If won: Add this result to the Wins Substrate. Format as: Client/Industry → Problem → Solution → Result → Timeline. Include any quotable feedback.]

Output the updated Proposal Framework at the end.
```
