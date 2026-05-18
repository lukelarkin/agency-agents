# Lead Follow-Up Prompt Chains

> 10 copy-paste prompt chains for System 5: The Lead Follow-Up Machine.
> Each prompt has [BRACKETS] where you fill in your specific information.

---

## Prompt Chain #1: Lead Tracker Setup

> **Used in:** System 5, Step 1 (One-time setup)
> **Purpose:** Creates a simple lead tracking system in your preferred tool

```
Help me set up a lead tracking system.

**My current tool:** [GOOGLE SHEETS / NOTION / AIRTABLE / CRM NAME / "I have nothing"]
**My lead sources:** [WHERE DO LEADS COME FROM — website, referrals, social media, networking, etc.]
**My typical sales cycle:** [HOW LONG FROM FIRST CONTACT TO CLOSE — e.g., "2–4 weeks"]
**Services I sell:** [YOUR SERVICES AND TYPICAL PRICE POINTS]

**My current "open" leads (everyone I can think of who's shown interest):**
1. [NAME — COMPANY — HOW THEY FOUND ME — LAST CONTACT DATE — STATUS]
2. [ADD MORE]

Create:

1. **Lead tracker structure** with these columns:
   - Lead name and company
   - Source (where they came from)
   - Date first contacted
   - Status (Hot / Warm / Cold / Won / Lost)
   - Service interested in
   - Estimated deal value
   - Last touchpoint date
   - Next action + date
   - Notes
   - Sequence assigned (Hot/Warm/Cold)

2. **Lead categorization guide:**
   - Exact criteria for Hot, Warm, and Cold
   - When to move a lead between categories
   - When to mark a lead as Lost (give up)

3. **Populate the tracker** with my current leads (categorize each one)

4. **Daily routine** for using the tracker (under 5 minutes)

5. **Weekly review checklist** for the tracker (under 10 minutes)

If using Google Sheets, give me the exact column headers and any formulas (like days since last contact). If using Notion, describe the database properties.
```

---

## Prompt Chain #2: Follow-Up Sequence Builder

> **Used in:** System 5, Step 2 (One-time setup)
> **Purpose:** Creates 3 follow-up sequences for different lead temperatures

```
Create three follow-up email sequences for my business.

**My business:** [YOUR BUSINESS TYPE AND SERVICES]
**My typical client:** [WHO THEY ARE AND WHAT THEY NEED]
**My voice:** [CASUAL / PROFESSIONAL / FRIENDLY / DIRECT — or paste Content DNA]

Build these 3 sequences:

**Sequence 1: HOT LEAD (just inquired, within last 48 hours)**
- 5 touchpoints over 14 days
- Tone: Helpful, responsive, not pushy
- Goal: Book a discovery call
- Each email should provide value, not just "checking in"

**Sequence 2: WARM LEAD (showed interest 1–4 weeks ago, went quiet)**
- 7 touchpoints over 30 days
- Tone: Patient, value-adding, persistent without being annoying
- Goal: Re-engage and move to conversation
- Includes case studies, tips, and insights

**Sequence 3: COLD LEAD (no contact in 30+ days)**
- 3 touchpoints over 10 days
- Tone: Light, no-pressure, "thought of you"
- Goal: Get a response (any response)
- Final email offers a clean exit

For each email in each sequence, provide:
- Day number (when to send)
- Subject line
- Complete email body (ready to personalize and send)
- What makes this email different from the others

Every email must deliver value. Zero emails can say "just checking in" or "touching base." Each one gives the lead something useful.
```

---

## Prompt Chain #3: Follow-Up Personalizer

> **Used in:** System 5, Step 3 (Per lead)
> **Purpose:** Customizes a generic follow-up sequence for a specific lead

```
Personalize my follow-up sequence for this specific lead.

**Lead details:**
- Name: [LEAD NAME]
- Company: [COMPANY]
- Role: [THEIR TITLE]
- Industry: [THEIR INDUSTRY]
- How they found me: [SOURCE — website, referral, LinkedIn, event, etc.]
- What they inquired about: [THEIR ORIGINAL INTEREST]
- What I know about their situation: [ANY CONTEXT FROM CONVERSATIONS, THEIR WEBSITE, SOCIAL MEDIA]
- Last contact: [DATE AND WHAT WAS DISCUSSED]

**Sequence type:** [HOT / WARM / COLD]

**My sequence template:**
[PASTE THE RELEVANT SEQUENCE FROM CHAIN #2]

Personalize every email in the sequence:
1. Replace generic references with specific details about their company and situation
2. Reference their specific problem/interest (not generic benefits)
3. Use case studies or results relevant to their industry
4. Include at least one thing that shows I looked at their business (website, social, recent news)
5. Make the CTA relevant to where they are in their decision process

Each email should feel like I wrote it specifically for them, not like they're in a drip sequence.
```

---

## Prompt Chain #4: Daily Follow-Up Generator

> **Used in:** System 5, Step 4 (Daily)
> **Purpose:** Generates today's follow-up messages based on your tracker

```
Generate my follow-up messages for today.

**Leads due for follow-up today:**

Lead 1:
- Name: [NAME] at [COMPANY]
- Sequence: [HOT/WARM/COLD], Email #[NUMBER]
- Context: [BRIEF CONTEXT — what they need, last conversation, any notes]
- Channel: [EMAIL / LINKEDIN DM / TEXT]

Lead 2:
- Name: [NAME] at [COMPANY]
- Sequence: [HOT/WARM/COLD], Email #[NUMBER]
- Context: [BRIEF CONTEXT]
- Channel: [EMAIL / LINKEDIN DM / TEXT]

[ADD MORE AS NEEDED]

**Something useful I can share today:** [A RECENT BLOG POST, ARTICLE, TIP, RESULT, OR INDUSTRY NEWS — or say "suggest something"]

For each lead, generate:
1. The complete message (ready to send)
2. Subject line (if email)
3. Personalized value-add for this specific lead
4. Suggested time to send

Keep each message concise:
- Email: under 150 words
- LinkedIn DM: under 75 words
- Text: under 50 words

None of these can be generic. Each one must reference something specific to that person.
```

---

## Prompt Chain #5: Follow-Up Scheduler

> **Used in:** System 5, Step 4 (Weekly)
> **Purpose:** Creates your weekly follow-up calendar

```
Create my follow-up calendar for the week ahead.

**My active leads and their status:**

[PASTE YOUR LEAD TRACKER — or list each lead like this:]
- [NAME] — [HOT/WARM/COLD] — Last contact: [DATE] — Sequence email #[NUMBER] — Next due: [DATE]
[ADD ALL ACTIVE LEADS]

**My availability for follow-up this week:**
- Daily follow-up block time: [TIME — e.g., "9:00–9:15 AM"]
- Days I'm unavailable: [ANY DAYS OFF]

Create:

1. **Daily follow-up schedule:**
   For each day (Mon–Fri), list:
   - Which leads to contact
   - Which sequence email number
   - Priority order (hottest leads first)
   - Estimated time needed

2. **Week overview:**
   - Total follow-ups this week: [number]
   - Leads to advance to next stage: [which ones]
   - Leads to close out (mark as lost): [which ones]
   - New leads to add to sequences: [any]

3. **Prep tasks for Monday morning:**
   - Any research to do before sending
   - Content/resources to prepare
   - Templates to customize
```

---

## Prompt Chain #6: Response Handler

> **Used in:** System 5, Step 5 (Per response)
> **Purpose:** Crafts the right reply when a lead responds to your follow-up

```
A lead just responded to my follow-up. Help me craft the right reply.

**Lead:** [NAME] at [COMPANY]
**Their response:**

[PASTE THEIR EXACT RESPONSE]

**Context:**
- What they originally inquired about: [THEIR INTEREST]
- Where they are in my sequence: [HOT/WARM/COLD, email #X]
- My service that fits: [WHAT I'D RECOMMEND]
- Their likely objections: [ANY CONCERNS I ANTICIPATE]

**Response type:** [POSITIVE / "NOT RIGHT NOW" / NEGATIVE / QUESTION / UNCLEAR]

Generate:

**If positive (they want to move forward):**
- Reply acknowledging their interest (warm, not salesy)
- Suggest a specific next step (discovery call with 2–3 time options)
- Include one brief confidence-builder (a result or credential)
- Keep it under 100 words

**If "not right now" (interested but bad timing):**
- Gracious, zero-pressure response
- Ask when would be better (specific: "Would Q3 be a better time?")
- Offer to send something useful in the meantime
- Set a follow-up reminder date
- Keep it under 75 words

**If negative (not interested):**
- Professional, dignified response
- Leave the door open for the future
- Remove from active sequence
- Keep it under 50 words

**If unclear (can't tell what they mean):**
- Brief clarifying question
- Make it easy to answer (yes/no or multiple choice)
- Keep it under 50 words

Write the appropriate reply based on their response type.
```

---

## Prompt Chain #7: Lead Resurrection Campaign

> **Used in:** System 5, Step 6 (Monthly)
> **Purpose:** Re-engages cold leads with personalized messages

```
Help me re-engage my cold leads. These are people who showed interest 30+ days ago and went silent.

**My cold leads:**

1. [NAME] at [COMPANY] — Originally interested in [SERVICE] — Last contact: [DATE] — Context: [ANY NOTES]
2. [NAME] at [COMPANY] — Originally interested in [SERVICE] — Last contact: [DATE] — Context: [ANY NOTES]
3. [ADD MORE]

**Recent wins I can reference:**
- [CLIENT RESULT #1 — brief description]
- [CLIENT RESULT #2]

**New things in my business:**
- [ANYTHING NEW — service, case study, tool, insight, blog post]

For each cold lead, generate:

1. **A personalized re-engagement email:**
   - Reference something specific to them (not generic)
   - Lead with value (something useful for their situation)
   - Don't mention that they went silent (no guilt)
   - Include a low-pressure CTA (reply with "1" for yes, "2" for not now, "3" for not interested)
   - Under 150 words

2. **The approach/angle for each lead:**
   - Why this specific angle for this specific person
   - What makes this likely to get a response

Batch these so I can send all of them in one 30-minute session.
```

---

## Prompt Chain #8: Follow-Up Performance Analyzer

> **Used in:** System 5, Step 7 (Monthly)
> **Purpose:** Analyzes your follow-up effectiveness and suggests improvements

```
Analyze my follow-up performance this month.

**Follow-up stats:**
- Total follow-up emails sent: [NUMBER]
- Responses received: [NUMBER]
- Response rate: [PERCENTAGE]
- Discovery calls booked from follow-up: [NUMBER]
- Deals closed from follow-up leads: [NUMBER]
- Leads marked as lost: [NUMBER]
- Cold leads resurrected: [NUMBER]

**What's working:**
- [DESCRIBE FOLLOW-UPS THAT GOT RESPONSES — what did they have in common?]

**What's not working:**
- [DESCRIBE FOLLOW-UPS THAT GOT IGNORED — any patterns?]

**Feedback received:**
- [ANY DIRECT FEEDBACK FROM LEADS ABOUT YOUR OUTREACH — positive or negative]

Analyze:

1. **Response rate assessment:** Is my response rate healthy? How does it compare to benchmarks? (10-15% for cold, 20-30% for warm, 40%+ for hot)

2. **Sequence effectiveness:** Which sequence (hot/warm/cold) is performing best and worst?

3. **Email-level analysis:** Based on what's working and not working, which specific emails in my sequences need improvement?

4. **Timing analysis:** Any patterns in when responses come? Should I adjust my send times?

5. **Channel analysis:** Are emails, DMs, or texts getting better response rates?

6. **Top 3 improvements:** Specific changes to make to my sequences, messaging, or approach

7. **Updated sequences:** Rewrite the 2 weakest emails across all sequences with improved versions
```

---

## Prompt Chain #9: Value-Add Content Creator

> **Used in:** System 5, Step 8 (Weekly)
> **Purpose:** Creates value-add snippets to drop into follow-up emails

```
Create a week's worth of value-add content snippets I can use in follow-up emails.

**My expertise area:** [YOUR AREA OF EXPERTISE]
**My target audience:** [WHO YOUR LEADS ARE]
**Their common problems:** [TOP 3–5 PROBLEMS YOUR LEADS FACE]
**Industry/niche:** [THEIR INDUSTRY]

Create 5 value-add snippets (one per weekday):

For each snippet, provide:
1. **The snippet** (2–4 sentences I can paste into any follow-up email)
2. **Type:** (Quick tip / Industry insight / Tool recommendation / Mini case study / Contrarian take)
3. **Best used with:** (Hot leads / Warm leads / Cold leads / Any)
4. **Lead-in sentence:** (How to naturally introduce this in an email)

Requirements:
- Each snippet must be genuinely useful on its own (not a teaser for my services)
- Each one should subtly demonstrate my expertise without pitching
- Varied formats so leads don't feel like they're getting the same type of email every time
- Current and relevant (not generic advice they've heard 100 times)

Also provide:
- **3 article/resource recommendations** I can share (real topics to search for — I'll find the actual articles)
- **1 bold opinion** on an industry trend that would spark a reply
```

---

## Prompt Chain #10: Referral Ask Generator

> **Used in:** System 5, Step 9 (Per happy client)
> **Purpose:** Creates natural referral request sequences

```
A client engagement is wrapping up successfully. Help me ask for referrals without being awkward.

**Client:** [NAME] at [COMPANY]
**What I did for them:** [YOUR SERVICE AND DELIVERABLES]
**Results achieved:** [SPECIFIC OUTCOMES]
**Relationship quality:** [GREAT / GOOD — and why]
**How long we worked together:** [TIMELINE]
**Their network:** [WHAT TYPE OF PEOPLE THEY LIKELY KNOW — industry peers, business owner friends, etc.]
**My ideal referral:** [DESCRIBE YOUR PERFECT NEXT CLIENT]

Create a 2-email referral sequence:

**Email 1 — The Seed (send with final deliverable or wrap-up email):**
- Thank them genuinely (reference specific moments from the engagement)
- Share the results you achieved together (makes them feel good about their decision)
- Plant the seed: "If you know anyone dealing with [specific problem], I'd love an introduction"
- Make it specific: describe exactly who would be a good fit (not "anyone who needs marketing help")
- Make it easy: "Just reply with their name and email, or CC me on an intro — I'll take it from there"
- No pressure language

**Email 2 — The Direct Ask (1 week later, only if they didn't respond to the seed):**
- Brief, warm, direct
- Reference a specific person or type of person they might know
- Offer to make it easy: provide a "forwardable blurb" they can just send to the referral
- Include the forwardable blurb (a 3-sentence email they can forward that introduces you)
- Reiterate: only if they genuinely think the person would benefit

Tone: Grateful and confident, never desperate. This should feel like a natural extension of a good working relationship.
```
