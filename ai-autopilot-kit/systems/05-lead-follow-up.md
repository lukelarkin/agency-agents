# System 5: The Lead Follow-Up Machine

## The Problem

**80% of sales happen after the 5th follow-up, but 90% of business owners stop after 1.** You're leaving money on the table every single week. Leads come in — from your website, social media, referrals, networking events — and you follow up once (maybe twice), then forget. Three months later, you see them post about hiring your competitor. The cost: **$3K–$15K/month** in lost revenue from leads you already had.

## Before (What You're Doing Now)

- Someone inquires about your services → you respond within a day (maybe)
- They don't reply → you follow up once, feel awkward, stop
- You have a pile of "warm leads" in your email/DMs/notes that you haven't touched in weeks
- Networking event → you collect 10 business cards → you email 3 of them → nothing happens
- No system for tracking who you've contacted and when
- You occasionally remember a lead at 2am and think "I should have followed up with them"
- Your follow-up messages are generic: "Just checking in!" (cringe)

## After (With This System Running)

- Every lead gets a personalized follow-up sequence (5–7 touches over 30 days)
- Each follow-up adds value (not "just checking in" — actual useful content)
- You spend 15 minutes/day on follow-up and it runs like clockwork
- Cold leads warm up because you stay top-of-mind without being annoying
- Your "lead graveyard" gets resurrected — old leads start replying
- Close rate improves because you're following up consistently and professionally

## Step-by-Step Implementation

### Step 1: Build Your Lead Tracking System (One-Time — 20 minutes)

Run **Prompt Chain #1: Lead Tracker Setup** from `prompts/follow-up-prompts.md`.

This creates a simple lead tracking system using whatever tool you already have (spreadsheet, CRM, Notion, even a notes app).

**You'll need:**
- A list of your current "open" leads (everyone who's expressed interest but hasn't bought)
- Your lead sources (where do leads come from?)
- Your typical sales cycle length (how long from first contact to close?)

### Step 2: Create Your Follow-Up Sequences (One-Time — 30 minutes)

Run **Prompt Chain #2: Follow-Up Sequence Builder**.

This creates three follow-up sequences:
1. **Hot Lead (just inquired):** 5 touchpoints over 14 days
2. **Warm Lead (showed interest but went quiet):** 7 touchpoints over 30 days
3. **Cold Lead (old lead, re-engagement):** 3 touchpoints over 10 days

See `templates/email-sequences/nurture-sequence.md` and `templates/email-sequences/re-engagement-sequence.md` for the full sequences.

### Step 3: Personalize Each Follow-Up (Per Lead — 3 minutes)

Run **Prompt Chain #3: Follow-Up Personalizer**.

Input: Lead's name, company, original inquiry, and any context you have.
Output: A personalized version of each email in the sequence that references their specific situation.

This is the key differentiator — your follow-ups won't feel automated because each one references something specific to that person.

### Step 4: Execute Your Daily Follow-Up Block (Daily — 15 minutes)

Every morning (or whenever works for you), open your lead tracker and:

1. Check who's due for a follow-up today
2. Run **Prompt Chain #4: Daily Follow-Up Generator** with the lead's context
3. Send the message (email, DM, or text depending on the channel)
4. Log the touchpoint in your tracker

Run **Prompt Chain #5: Follow-Up Scheduler** at the start of each week to see your full follow-up calendar.

### Step 5: Handle Responses (Per Response — 5 minutes)

When a lead responds (positive, negative, or "not right now"), run **Prompt Chain #6: Response Handler**.

Input: Their response + your conversation history.
Output:
- If positive: Next steps email + meeting scheduling language
- If "not now": Graceful nurture response + when to check back
- If negative: Professional close-out + door-open language

### Step 6: Resurrect Old Leads (Monthly — 30 minutes)

Run **Prompt Chain #7: Lead Resurrection Campaign**.

Input: Your list of leads that went cold 30+ days ago.
Output: A batch of personalized re-engagement messages tailored to each lead.

See `templates/email-sequences/re-engagement-sequence.md` for the template.

### Step 7: Optimize Your Sequences (Monthly — 15 minutes)

Run **Prompt Chain #8: Follow-Up Performance Analyzer**.

Input: Response rates, conversion rates, and feedback from your follow-ups.
Output: What's working, what's not, and specific tweaks to improve.

### Step 8: Create Value-Add Content for Follow-Ups (Weekly — 10 minutes)

Run **Prompt Chain #9: Value-Add Content Creator**.

Instead of "just checking in," each follow-up delivers something useful: a relevant article summary, a quick tip, a tool recommendation, or a mini case study. This prompt generates a week's worth of value-add snippets you can drop into follow-ups.

### Step 9: Referral Request Sequence (Per Happy Client — 5 minutes)

Run **Prompt Chain #10: Referral Ask Generator**.

After a successful engagement, this creates a natural, non-awkward referral request sequence (2 emails) that consistently generates warm introductions.

## Prompt Cross-Reference

| Step | Prompt Chain | File |
|------|-------------|------|
| 1 | #1: Lead Tracker Setup | `prompts/follow-up-prompts.md` |
| 2 | #2: Follow-Up Sequence Builder | `prompts/follow-up-prompts.md` |
| 3 | #3: Follow-Up Personalizer | `prompts/follow-up-prompts.md` |
| 4 | #4: Daily Follow-Up Generator | `prompts/follow-up-prompts.md` |
| 4 | #5: Follow-Up Scheduler | `prompts/follow-up-prompts.md` |
| 5 | #6: Response Handler | `prompts/follow-up-prompts.md` |
| 6 | #7: Lead Resurrection Campaign | `prompts/follow-up-prompts.md` |
| 7 | #8: Follow-Up Performance Analyzer | `prompts/follow-up-prompts.md` |
| 8 | #9: Value-Add Content Creator | `prompts/follow-up-prompts.md` |
| 9 | #10: Referral Ask Generator | `prompts/follow-up-prompts.md` |

Also see:
- `templates/email-sequences/nurture-sequence.md` — 7-email nurture flow
- `templates/email-sequences/re-engagement-sequence.md` — 3-email win-back flow

## "Done Right" Checklist

After running this system for one week, verify:

- [ ] You have a lead tracker with every open lead listed and categorized (hot/warm/cold)
- [ ] Each lead has a follow-up sequence assigned with specific dates
- [ ] Your follow-up messages reference something specific to each lead (not generic)
- [ ] You spent 15 minutes or less per day on follow-up (not 0 minutes or 60 minutes)
- [ ] At least one "cold" lead responded to a re-engagement message
- [ ] None of your follow-ups say "just checking in" or "touching base"
- [ ] Every follow-up provides value (a tip, resource, insight, or relevant update)
- [ ] You feel confident that no lead is falling through the cracks

## Estimated Time Savings

| Task | Before | After | Saved |
|------|--------|-------|-------|
| Writing follow-up emails | 30 min/day | 15 min/day | **2.5 hrs/week** |
| Tracking lead status | 0 min (not doing it) | 5 min/day | **Better outcomes** |
| Re-engaging old leads | 0 min (not doing it) | 30 min/month | **$1K–$5K recovered** |
| Referral requests | Sporadic | Systematic | **1–3 referrals/month** |
| **Total** | **Inconsistent, stressful** | **15 min/day, systematic** | **2.5 hrs/week + revenue** |

**Revenue impact:** If consistent follow-up closes just ONE additional deal per month at $2,000, that's **$24,000/year** in revenue you were previously leaving on the table. This system is the highest-ROI system in the entire kit.
