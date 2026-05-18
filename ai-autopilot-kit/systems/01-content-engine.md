# System 1: The Weekly Content Engine

## The Problem

You spend **6–8 hours per week** creating content: writing social posts, drafting emails, trying to blog. Most of it feels generic, gets minimal engagement, and doesn't drive business. At a conservative $75/hr, that's **$450–$600/week wasted** on content that doesn't convert.

## Before (What You're Doing Now)

- Staring at a blank screen every Monday trying to figure out what to post
- Writing one-off social posts that take 45 minutes each and get 12 likes
- Skipping your email newsletter because "you didn't have time this week"
- Your blog hasn't been updated in 3 months
- You recycle the same 4 talking points because you can't think of new angles
- Content creation feels like a chore that pulls you away from actual revenue work

## After (With This System Running)

- Every Monday morning, you have a full week of content drafted in under 60 minutes
- 5 social posts, 1 email newsletter, and 1 blog post — all created from a single "content seed"
- Each piece is written in YOUR voice with YOUR business context baked in
- Content builds on itself (your social posts tease your email, your email drives to your blog)
- You batch-create a month of content in one 3-hour session
- Content actually generates replies, leads, and sales conversations

## Step-by-Step Implementation

### Step 1: Set Up Your Content Foundation (One-Time — 20 minutes)

Open `prompts/content-engine-prompts.md` and run **Prompt Chain #1: Business Voice Extraction**.

This creates your "Content DNA" document — a reference that every future prompt will use so AI writes in YOUR voice, not generic AI-speak.

**You'll need:**
- 3 examples of content you've written that felt "like you"
- Your top 5 topics/themes you want to be known for
- Your target audience description (who you're talking to)

Save the output as your Content DNA. You'll paste it into every content prompt going forward.

### Step 2: Generate Your Weekly Content Seed (Every Monday — 10 minutes)

Run **Prompt Chain #2: Weekly Content Seed Generator**.

This takes one idea (a client win, an observation, a lesson learned) and turns it into a structured "content seed" that feeds every piece of content for the week.

**Input:** One sentence about something that happened in your business this week.
**Output:** A content seed document with 7+ angles, hooks, and talking points.

### Step 3: Create Your Social Media Posts (Monday — 15 minutes)

Run **Prompt Chain #3: Social Post Batch Creator**.

Feed it your content seed + Content DNA. It produces 5 platform-ready posts:
- 2 LinkedIn posts (one story-based, one tactical)
- 2 Instagram/Facebook posts (one carousel concept, one short-form)
- 1 Twitter/X thread (5–7 tweets)

### Step 4: Write Your Weekly Email (Monday — 15 minutes)

Run **Prompt Chain #4: Email Newsletter Generator**.

Feed it your content seed + Content DNA + one social post that resonated. It produces:
- Subject line (3 options, ranked by open-rate potential)
- Email body (story → lesson → CTA format)
- P.S. line with a secondary offer or ask

### Step 5: Generate Your Blog Post (Monday — 20 minutes)

Run **Prompt Chain #5: Blog Post Generator**.

Feed it your content seed + the email you just wrote. It produces:
- SEO-optimized headline (with keyword suggestion)
- 800–1,200 word blog post
- Meta description
- 3 internal linking suggestions

### Step 6: Schedule Everything (Monday — 10 minutes)

Use your scheduling tool of choice (Buffer, Later, Mailchimp, or even just drafts in each platform) to schedule the week's content.

Refer to `templates/content-calendar-template.md` for the recommended posting schedule.

### Step 7: Review & Optimize (Friday — 10 minutes)

Run **Prompt Chain #6: Content Performance Reviewer**.

Paste in your engagement numbers from the week. The prompt analyzes what worked, what didn't, and adjusts your strategy for next week.

## Prompt Cross-Reference

| Step | Prompt Chain | File |
|------|-------------|------|
| 1 | #1: Business Voice Extraction | `prompts/content-engine-prompts.md` |
| 2 | #2: Weekly Content Seed Generator | `prompts/content-engine-prompts.md` |
| 3 | #3: Social Post Batch Creator | `prompts/content-engine-prompts.md` |
| 4 | #4: Email Newsletter Generator | `prompts/content-engine-prompts.md` |
| 5 | #5: Blog Post Generator | `prompts/content-engine-prompts.md` |
| 6 | (Manual — use template) | `templates/content-calendar-template.md` |
| 7 | #6: Content Performance Reviewer | `prompts/content-engine-prompts.md` |

Also see:
- **Prompt Chains #7–#15** in the prompts file for advanced content workflows (repurposing, thread writing, case study creation, etc.)

## "Done Right" Checklist

After your first week running this system, verify:

- [ ] Your Content DNA document exists and feels like YOUR voice (read it aloud — does it sound like you?)
- [ ] You generated at least 5 social posts from a single content seed
- [ ] Each post has a clear hook in the first line (not "I've been thinking about...")
- [ ] Your email has a specific CTA (not just "let me know what you think")
- [ ] Your blog post targets a specific keyword your audience actually searches for
- [ ] All content connects back to your core offer (even subtly)
- [ ] You completed the entire process in under 90 minutes
- [ ] You scheduled at least 3 days of content in advance

## Estimated Time Savings

| Task | Before | After | Saved |
|------|--------|-------|-------|
| Social media posts (5/week) | 3.5 hrs | 15 min | **3 hrs 15 min** |
| Email newsletter | 1.5 hrs | 15 min | **1 hr 15 min** |
| Blog post | 2 hrs | 20 min | **1 hr 40 min** |
| Content planning | 1 hr | 10 min | **50 min** |
| Performance review | 30 min | 10 min | **20 min** |
| **Total** | **8.5 hrs/week** | **1 hr 10 min/week** | **7 hrs 20 min/week** |

At $75/hr, that's **$550/week** or **$2,200/month** in recovered time.
