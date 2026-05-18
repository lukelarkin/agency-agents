# System 4: The CEO Weekly Review Dashboard

## The Problem

You're so deep in the day-to-day that you never step back to see the full picture. You don't know your real numbers: how many leads came in, what your close rate is, which services are most profitable, or whether you're actually growing. You "feel" busy but can't tell if you're productive. Important decisions get made on gut feeling instead of data. This is how businesses plateau — and it costs you **$2K–$10K/month** in missed opportunities and wrong turns.

## Before (What You're Doing Now)

- No weekly review at all (you keep saying you'll start one)
- Or: a vague 5-minute "how did this week go?" that changes nothing
- No dashboard or scorecard — you check revenue in Stripe and call it analysis
- Decisions about pricing, services, and marketing are based on feelings
- You only realize a problem when it's already a crisis (lost client, empty pipeline, cash crunch)
- Your week starts reactively — putting out fires instead of executing a plan

## After (With This System Running)

- Every Friday, you spend 30 minutes with a structured CEO review
- You see your key numbers at a glance: revenue, pipeline, content performance, client health
- Problems surface early (a client going quiet, a lead source drying up, expenses creeping)
- You make 3 clear decisions for next week based on actual data
- Your Monday starts with focus and direction, not chaos
- Over 90 days, you see trends that completely change your strategy

## Step-by-Step Implementation

### Step 1: Define Your Scorecard (One-Time — 20 minutes)

Run **Prompt Chain #1: CEO Scorecard Builder** from `prompts/review-prompts.md`.

This creates your personalized weekly scorecard — the 8–12 numbers that actually matter for YOUR business. Not vanity metrics; real leading and lagging indicators.

**You'll need:**
- Your business model (services, products, recurring vs. project)
- Your current revenue range
- What you consider a "good week" vs. a "bad week"
- Your top 3 business goals for the next 90 days

See `templates/weekly-review-template.md` for the scorecard template.

### Step 2: Run Your First Weekly Review (Every Friday — 30 minutes)

Run **Prompt Chain #2: Weekly Review Analyzer**.

**Input:** Your numbers for the week:
- Revenue collected and invoiced
- New leads/inquiries received
- Proposals sent and won/lost
- Content published and engagement metrics
- Hours worked and on what
- Client satisfaction signals (positive feedback, complaints, silence)
- Cash flow snapshot

**Output:**
- Performance summary (up/down/flat vs. last week and 4-week average)
- 3 wins to celebrate (even small ones — this prevents burnout)
- 3 concerns to address (with suggested actions)
- 3 priorities for next week (specific, actionable, time-bound)

### Step 3: Make Decisions (Every Friday — 10 minutes)

Run **Prompt Chain #3: Decision Clarifier**.

For any tough decision surfaced in your review, this prompt chain walks you through:
- What's the actual decision to make?
- What data do you have?
- What are the options?
- What's the risk of each option?
- What would you advise a friend in this situation?
- Decision + first action step

### Step 4: Plan Next Week (Every Friday — 10 minutes)

Run **Prompt Chain #4: Weekly Planning Generator**.

Input: Your 3 priorities from Step 2 + your calendar for next week.
Output: A time-blocked plan showing exactly when you'll work on each priority, with buffer time for reactive work.

### Step 5: Track Trends Monthly (Last Friday of Month — 15 minutes)

Run **Prompt Chain #5: Monthly Trend Analyzer**.

Input: Your last 4 weekly scorecards.
Output: Trend analysis showing:
- Which numbers are improving, declining, or flat
- Correlation insights ("weeks where you published 5+ posts had 2x more leads")
- Recommended adjustments to your systems, pricing, or focus areas
- Updated 90-day goal check

## Prompt Cross-Reference

| Step | Prompt Chain | File |
|------|-------------|------|
| 1 | #1: CEO Scorecard Builder | `prompts/review-prompts.md` |
| 2 | #2: Weekly Review Analyzer | `prompts/review-prompts.md` |
| 3 | #3: Decision Clarifier | `prompts/review-prompts.md` |
| 4 | #4: Weekly Planning Generator | `prompts/review-prompts.md` |
| 5 | #5: Monthly Trend Analyzer | `prompts/review-prompts.md` |

Also see:
- `templates/weekly-review-template.md` — CEO weekly scorecard template
- `dashboard/index.html` — Log your weekly metrics in the interactive dashboard

## "Done Right" Checklist

After your first weekly review with this system, verify:

- [ ] You identified your 8–12 key metrics and know where to find each number
- [ ] You completed the full review in 30 minutes or less
- [ ] You identified at least 1 win you would have overlooked otherwise
- [ ] You spotted at least 1 concern before it became a crisis
- [ ] You have 3 specific priorities for next week (not "do more marketing")
- [ ] Each priority has a specific time blocked on your calendar
- [ ] You logged your numbers in the dashboard (for trend tracking)
- [ ] You feel clearer and more in control than you did before the review

## Estimated Time Savings

This system doesn't just save time — it saves money by improving decisions.

| Impact Area | Before | After | Value |
|-------------|--------|-------|-------|
| Weekly planning | 0 min (no planning) | 30 min (structured) | **Better decisions** |
| Problem detection | Weeks late | Same week | **Prevents $500–$2K losses** |
| Opportunity identification | Random | Systematic | **Captures $1K–$5K/month** |
| Decision-making | Gut feeling, slow | Data-informed, fast | **Reduces costly mistakes** |
| Mental clarity | Anxious, reactive | Calm, proactive | **Priceless** |

**Conservative estimate:** Preventing ONE bad decision or catching ONE opportunity per month is worth **$1,000–$5,000**. The 30 minutes/week investment pays for itself 10x over.
