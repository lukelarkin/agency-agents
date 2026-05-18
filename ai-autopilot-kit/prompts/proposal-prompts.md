# Proposal Generator Prompt Chains

> 8 copy-paste prompt chains for System 3: The 10-Minute Proposal Generator.
> Each prompt has [BRACKETS] where you fill in your specific information.

---

## Prompt Chain #1: Proposal Framework Builder

> **Used in:** System 3, Step 1 (One-time setup)
> **Purpose:** Creates your master proposal framework customized to your services

```
I need to build a master proposal framework for my business. This will be the foundation for every proposal I send.

**My business:**
- Company name: [YOUR COMPANY]
- Services I offer: [LIST YOUR SERVICES WITH BRIEF DESCRIPTIONS]
- Price range: [YOUR TYPICAL PRICE RANGE — e.g., "$2,000–$10,000 per project"]
- Typical project timeline: [e.g., "4–8 weeks"]

**My differentiators:**
- [WHAT MAKES YOU DIFFERENT #1]
- [WHAT MAKES YOU DIFFERENT #2]
- [WHAT MAKES YOU DIFFERENT #3]

**Common objections I hear:**
- [OBJECTION #1 — e.g., "That's more than we budgeted"]
- [OBJECTION #2 — e.g., "We need it done faster"]
- [OBJECTION #3 — e.g., "How do we know this will work?"]

**Past proposals (paste 1–2 if you have them):**
[PASTE PREVIOUS PROPOSAL TEXT — or say "I don't have any past proposals"]

**My best client results:**
- [RESULT #1 — specific and measurable]
- [RESULT #2]
- [RESULT #3]

Create my master proposal framework with:
1. **Reusable sections** I can use in every proposal (About Us, Why Us, Process, Terms)
2. **Objection-handling language** woven naturally into the framework
3. **Pricing presentation strategy** (how to frame value before showing price)
4. **Proposal structure** (the exact sections in order, with guidance on what goes in each)
5. **A "wins document"** template where I catalog results for the Social Proof Matcher

Output the complete framework as a reusable template.
```

---

## Prompt Chain #2: Custom Proposal Generator

> **Used in:** System 3, Step 2 (Per prospect)
> **Purpose:** Generates a complete custom proposal from discovery call notes

```
Generate a complete proposal for this prospect using my framework.

**My proposal framework:**
[PASTE YOUR FRAMEWORK FROM CHAIN #1 — or paste your About/Why Us/Process sections]

**Prospect details:**
- Name: [PROSPECT NAME]
- Company: [COMPANY NAME]
- Role: [THEIR TITLE]
- Industry: [THEIR INDUSTRY]

**From our discovery call:**
- Their main problem: [WHAT THEY SAID THEIR BIGGEST CHALLENGE IS]
- Their stated goals: [WHAT THEY WANT TO ACHIEVE]
- Why now: [WHAT'S DRIVING THE URGENCY]
- Budget indicators: [ANY BUDGET SIGNALS FROM THE CONVERSATION]
- Decision process: [WHO ELSE IS INVOLVED, TIMELINE FOR DECISION]
- Other options they're considering: [COMPETITORS OR DIY]
- Key quotes: [ANYTHING MEMORABLE THEY SAID — use their exact words in the proposal]

**My recommended solution:**
- Service/package: [WHAT I'M RECOMMENDING]
- Price: $[AMOUNT]
- Timeline: [WEEKS/MONTHS]
- Key deliverables: [LIST THE MAIN DELIVERABLES]

Generate a complete proposal with:
1. Executive summary (personalized — reference their specific situation)
2. The challenge (in their words, showing I listened)
3. Proposed solution (my approach + why it fits their needs)
4. Scope and deliverables (clear, specific, no ambiguity)
5. Timeline with milestones
6. Investment section (value-framed, with 2–3 tier options if appropriate)
7. Why us (tailored to what matters to this prospect)
8. Social proof (relevant case study or result)
9. Next steps (specific action + expiration date)
10. Terms and conditions (brief)

Write it in a confident, professional tone. The proposal should feel like it was written specifically for them (because it was).
```

---

## Prompt Chain #3: Social Proof Matcher

> **Used in:** System 3, Step 3 (Per proposal)
> **Purpose:** Finds the most relevant case studies and testimonials for each prospect

```
I need to add the most relevant social proof to a proposal.

**The prospect:**
- Industry: [THEIR INDUSTRY]
- Problem: [THEIR MAIN PROBLEM]
- Company size: [SMALL / MEDIUM / LARGE]
- Their concern: [THEIR BIGGEST HESITATION OR OBJECTION]

**My catalog of results and testimonials:**

[PASTE YOUR "WINS DOCUMENT" — or list your best results like this:]

Client A — [Industry]: [Result achieved], [Timeline]. Quote: "[Their testimonial]"
Client B — [Industry]: [Result achieved], [Timeline]. Quote: "[Their testimonial]"
Client C — [Industry]: [Result achieved], [Timeline]. Quote: "[Their testimonial]"
[ADD AS MANY AS YOU HAVE]

Select and format:
1. **Primary case study** (most similar to this prospect — same industry, problem, or company size)
   - Format as: Problem → Solution → Result (3–5 sentences)
2. **Supporting testimonial** (addresses their specific concern/objection)
   - Format as a pull quote with attribution
3. **Stats/results to weave in** (2–3 specific numbers I should mention throughout the proposal)
4. **"Social proof line"** for the executive summary (one sentence that establishes credibility)

If I don't have an exact match, suggest how to position the closest result as relevant to their situation.
```

---

## Prompt Chain #4: Proposal Quality Reviewer

> **Used in:** System 3, Step 4 (Per proposal)
> **Purpose:** Reviews your draft proposal and flags issues before sending

```
Review this proposal draft and give me brutally honest feedback.

**The proposal:**

[PASTE YOUR COMPLETE PROPOSAL DRAFT]

**Context:**
- Prospect's main concern: [THEIR BIGGEST OBJECTION/HESITATION]
- My goal: [CLOSE THE DEAL / START THE CONVERSATION / JUSTIFY THE PRICE]
- Deal size: $[AMOUNT]

Score each area (1–10) and explain WHY:

1. **Personalization (1–10):** Does this feel custom-written or template-y? Are their specific words and situation reflected?

2. **Clarity (1–10):** Could a non-expert understand exactly what they're getting? Any jargon or vague language?

3. **Value Framing (1–10):** Is the value established BEFORE the price appears? Would a reader feel the price is justified?

4. **Specificity (1–10):** Are deliverables concrete ("4 blog posts per month") or vague ("content creation services")?

5. **Objection Handling (1–10):** Does the proposal preemptively address their likely concerns?

6. **CTA Strength (1–10):** Is the next step crystal clear? Is there urgency without being pushy?

7. **Professional Polish (1–10):** Formatting, grammar, consistency, overall impression.

Then provide:
- **Top 3 things to fix** (specific rewrites, not just "make it better")
- **One thing that's working well** (so I don't accidentally change it)
- **The one sentence I should rewrite** that would have the biggest impact on win rate
```

---

## Prompt Chain #5: Proposal Follow-Up Sequence

> **Used in:** System 3, Step 5 (Per proposal)
> **Purpose:** Creates 3 follow-up emails for after you send a proposal

```
I just sent a proposal to [PROSPECT NAME] at [COMPANY] for [SERVICE] at $[PRICE].

**Proposal summary:** [2–3 SENTENCES ABOUT WHAT YOU PROPOSED]
**Their decision timeline:** [WHEN THEY SAID THEY'D DECIDE — or "unknown"]
**Their biggest concern:** [THEIR MAIN HESITATION]

Create 3 follow-up emails:

**Follow-Up #1 (Day 2) — The Check-In:**
- Confirm they received the proposal
- Offer to answer questions
- Restate one key benefit
- Keep it under 100 words
- Subject line that gets opened

**Follow-Up #2 (Day 5) — The Value-Add:**
- Share something genuinely useful (a relevant article, insight, resource, or case study)
- Connect it to their situation
- Don't mention the proposal directly
- Subtly reinforce why you're the right choice
- Under 150 words

**Follow-Up #3 (Day 8) — The Soft Close:**
- Acknowledge they're busy
- Present a clear next step (specific date/time to connect)
- Create gentle urgency (proposal expiration, schedule filling up, or project timeline)
- End with a direct question that requires a response
- Under 100 words

Each email should feel natural and non-desperate. I want to follow up without being "that person."
```

---

## Prompt Chain #6: Proposal Win/Loss Analyzer

> **Used in:** System 3, Step 6 (Monthly)
> **Purpose:** Analyzes patterns in your proposals to improve win rate

```
Analyze my proposal performance for the past month and help me improve.

**Proposals sent this month:**

Won:
- [PROSPECT/COMPANY] — $[AMOUNT] — [SERVICE] — [WHY THEY SAID YES, if you know]
- [ADD MORE]

Lost:
- [PROSPECT/COMPANY] — $[AMOUNT] — [SERVICE] — [WHY THEY SAID NO, if you know]
- [ADD MORE]

No response:
- [PROSPECT/COMPANY] — $[AMOUNT] — [SERVICE] — [DAYS SINCE SENT]
- [ADD MORE]

**My current win rate:** [X proposals won / Y proposals sent]

Analyze:
1. **Win patterns:** What do the won proposals have in common? (price point, service type, prospect type, speed of delivery)
2. **Loss patterns:** What do the lost proposals share? Any recurring objection?
3. **No-response patterns:** Is there a pattern in who ghosts? (price too high, wrong service, slow delivery)
4. **Pricing analysis:** Am I pricing too high, too low, or inconsistently?
5. **Speed analysis:** How fast are my proposals going out? Is speed correlating with wins?
6. **Top 3 changes** I should make to my proposal framework based on this data
7. **Updated win rate target** for next month and what would move the needle
```

---

## Prompt Chain #7: Upsell Proposal Generator

> **Purpose:** Creates add-on or upsell proposals for existing clients

```
I want to propose an additional service to an existing client.

**Client:** [NAME] at [COMPANY]
**Current engagement:** [WHAT YOU'RE ALREADY DOING FOR THEM]
**How it's going:** [GREAT / GOOD / OKAY — and why]
**The upsell opportunity:** [WHAT ADDITIONAL SERVICE YOU WANT TO PROPOSE]
**Why it makes sense:** [HOW THIS CONNECTS TO WHAT YOU'RE ALREADY DOING]
**Price:** $[AMOUNT]

Create a brief upsell proposal (not a full formal proposal — this is for an existing client):

1. **Email introducing the idea:**
   - Reference a specific result or insight from your current work
   - Naturally bridge to the opportunity you've identified
   - Present the recommendation as serving their goals (not your revenue)
   - Include a brief scope and price
   - Suggest a quick call to discuss

2. **One-page scope summary** (attached to the email):
   - What you've observed/achieved so far (set the stage)
   - The opportunity (what they're leaving on the table)
   - Proposed addition (scope, deliverables, timeline)
   - Investment
   - Expected ROI

Tone: Helpful advisor, not salesperson. This should feel like a natural extension of the conversation.
```

---

## Prompt Chain #8: Competitive Differentiator

> **Purpose:** Helps you articulate why prospects should choose you over alternatives

```
Help me articulate my competitive differentiation for proposals.

**My services:** [WHAT YOU DO]
**My typical competitors:**
- [COMPETITOR TYPE 1 — e.g., "bigger agencies that charge 3x more"]
- [COMPETITOR TYPE 2 — e.g., "freelancers on Upwork"]
- [COMPETITOR TYPE 3 — e.g., "the client doing it themselves / in-house"]

**My actual strengths:**
- [STRENGTH 1]
- [STRENGTH 2]
- [STRENGTH 3]

**My honest weaknesses:**
- [WEAKNESS 1 — e.g., "smaller team"]
- [WEAKNESS 2 — e.g., "less brand recognition"]

For each competitor type, create:
1. **A positioning statement** (2–3 sentences: why I'm the better choice for my target client)
2. **A "Why Us" paragraph** I can paste into proposals when I know this is the alternative
3. **An objection reframe** (how to turn my weakness into a strength against this competitor)
4. **A killer question** I can ask in discovery calls that makes the prospect realize this competitor isn't the right fit

Also create a **universal "Why Us" section** (5–7 sentences) that works regardless of who the competitor is. This goes in every proposal.
```
