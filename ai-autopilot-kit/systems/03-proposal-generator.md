# System 3: The 10-Minute Proposal Generator

## The Problem

Writing proposals takes **2–4 hours each**, and you send 3–5 per month. That's up to **20 hours/month** on documents where 80% of the content is the same every time. Worse: slow proposals lose deals. The prospect who reached out on Tuesday has already hired someone else by the time your proposal lands on Friday.

## Before (What You're Doing Now)

- Starting every proposal from scratch (or from a "template" that's really just your last proposal with the client name swapped)
- Spending an hour just on the "about us" section that nobody reads
- Agonizing over pricing presentation and second-guessing your rates
- Sending proposals 3–5 days after the initial conversation (prospect has gone cold)
- No follow-up system — you send it and hope
- Win rate feels random: some proposals close, most disappear into the void

## After (With This System Running)

- Prospect call ends → proposal is in their inbox within 2 hours
- Every proposal is customized to their specific situation, pain points, and goals
- Pricing is presented strategically (not just a number at the bottom)
- Built-in follow-up sequence nudges without being pushy
- Win rate increases because you're faster AND more professional than competitors
- You spend 10 minutes per proposal instead of 3 hours

## Step-by-Step Implementation

### Step 1: Build Your Proposal Framework (One-Time — 30 minutes)

Open `templates/proposal-template.md` and review the plug-and-play structure.

Then run **Prompt Chain #1: Proposal Framework Builder** from `prompts/proposal-prompts.md`. This creates your master proposal framework customized to your services.

**You'll need:**
- Your service offerings (what you sell, at what price points)
- 2–3 past proposals you've sent (even rough ones)
- Your unique selling points (why pick you over competitors)
- Common objections you hear from prospects

### Step 2: Generate a Custom Proposal (Per Prospect — 10 minutes)

After a discovery call with a prospect, run **Prompt Chain #2: Custom Proposal Generator**.

**Input:**
- Prospect's name, company, and role
- Their main problem/pain point (from your conversation)
- What they said their goals are
- Your recommended solution and pricing
- Timeline

**Output:** A complete, formatted proposal with:
- Executive summary (personalized to their situation)
- Problem statement (in their words)
- Proposed solution (your approach)
- Scope and deliverables (clear, specific)
- Timeline with milestones
- Investment section (strategically framed pricing)
- Why us / about section
- Next steps + expiration date

### Step 3: Add Social Proof (Per Proposal — 3 minutes)

Run **Prompt Chain #3: Social Proof Matcher**.

Input: The prospect's industry and problem. Output: Relevant case studies, results, and testimonials to embed in the proposal (pulled from your "wins" document you'll create in Step 1).

### Step 4: Review and Polish (Per Proposal — 5 minutes)

Run **Prompt Chain #4: Proposal Quality Reviewer**.

Paste your draft proposal. It checks for:
- Clarity (can a non-expert understand it?)
- Specificity (are deliverables concrete or vague?)
- Objection handling (does it preemptively address concerns?)
- CTA strength (is it clear what the prospect should do next?)
- Pricing presentation (is value established before price is shown?)

### Step 5: Send With Follow-Up Sequence (Per Proposal — 2 minutes)

Run **Prompt Chain #5: Proposal Follow-Up Sequence**.

This generates 3 follow-up emails:
1. **Day 2:** "Wanted to make sure you received this + any questions?"
2. **Day 5:** Add new value (share a relevant article, case study, or insight)
3. **Day 8:** Soft close with a specific next step and deadline

### Step 6: Track and Optimize (Monthly — 15 minutes)

Run **Prompt Chain #6: Proposal Win/Loss Analyzer**.

Input: List of proposals sent, which ones won, which lost, any feedback received.
Output: Patterns in your wins and losses, suggested tweaks to your framework.

## Prompt Cross-Reference

| Step | Prompt Chain | File |
|------|-------------|------|
| 1 | #1: Proposal Framework Builder | `prompts/proposal-prompts.md` |
| 2 | #2: Custom Proposal Generator | `prompts/proposal-prompts.md` |
| 3 | #3: Social Proof Matcher | `prompts/proposal-prompts.md` |
| 4 | #4: Proposal Quality Reviewer | `prompts/proposal-prompts.md` |
| 5 | #5: Proposal Follow-Up Sequence | `prompts/proposal-prompts.md` |
| 6 | #6: Proposal Win/Loss Analyzer | `prompts/proposal-prompts.md` |

Also see:
- `templates/proposal-template.md` — Plug-and-play proposal structure with example

## "Done Right" Checklist

After sending your first proposal with this system, verify:

- [ ] Proposal was sent within 2 hours of the discovery call (not 3 days)
- [ ] The executive summary references the prospect's specific situation (not generic)
- [ ] Deliverables are concrete and measurable (not "we'll optimize your marketing")
- [ ] Pricing section establishes value BEFORE showing the number
- [ ] There's a clear expiration date creating gentle urgency
- [ ] The next step is specific ("Sign and return by Friday" not "Let me know")
- [ ] You have 3 follow-up emails drafted and scheduled
- [ ] Total time from call to sent: under 30 minutes (including the call itself)

## Estimated Time Savings

| Task | Before | After | Saved |
|------|--------|-------|-------|
| Drafting proposal | 2.5 hrs | 10 min | **2 hrs 20 min** |
| Adding social proof | 30 min | 3 min | **27 min** |
| Review and polish | 30 min | 5 min | **25 min** |
| Writing follow-ups | 20 min | 2 min | **18 min** |
| **Total per proposal** | **3 hrs 50 min** | **20 min** | **3 hrs 30 min** |

At 4 proposals/month and $75/hr, that's **$1,050/month** in recovered time.

**Bonus:** Faster proposals = higher win rates. Even a 10% improvement in close rate on $3K deals = $1,200/month in additional revenue.
