# Follow-Up Cascade — Stage Prompts

> Prompts for Cascade 05: Follow-Up.
> Lead enters → personalized sequence generated → slop gate catches junk → daily execution → response data feeds back.

---

## Stage 01 · CAPTURE — Lead Substrate Generator

> Run for each new lead entering the cascade.

### Prompt

```
Process this lead into a structured Lead Substrate that will feed a personalized follow-up sequence.

<lead-info>
Name: [LEAD NAME]
Company: [COMPANY]
Role: [TITLE]
Industry: [INDUSTRY]
Source: [HOW THEY FOUND YOU — website, referral, LinkedIn, event, cold outreach response]
Original inquiry: [WHAT THEY ASKED ABOUT OR EXPRESSED INTEREST IN]
Date of first contact: [DATE]
Last contact: [DATE AND WHAT HAPPENED]
Context: [ANYTHING ELSE YOU KNOW — from their website, social media, conversation]
</lead-info>

Produce a LEAD SUBSTRATE:

## LEAD SUBSTRATE — [Name], [Company]

### PROFILE
- Name / Role / Company / Industry
- Source: [how they found you]
- First contact: [date]
- Last contact: [date]

### THEIR SITUATION
[What you know or can infer about their business problem. Be specific — reference their inquiry, their website, their industry challenges.]

### CATEGORY
[HOT / WARM / COLD — based on these criteria:]
- HOT: Inquired in last 48 hours. Active interest. Sequence: 5 touches, 14 days.
- WARM: Showed interest 1–4 weeks ago, went quiet. Sequence: 7 touches, 30 days.
- COLD: No contact in 30+ days. Sequence: 3 touches, 10 days.

### PERSONALIZATION HOOKS
[3–5 specific details about this person/company that can be woven into follow-up emails:]
- [e.g., "They recently launched a new product line (from their LinkedIn)"]
- [e.g., "They mentioned struggling with [specific thing] in our conversation"]
- [e.g., "Their website hasn't been updated in 6 months — relevant to our service"]
- [e.g., "Referral from [Name] — use the shared connection"]

### RELEVANT WINS
[From your Wins Substrate — which past results are most relevant to this lead's situation?]

### LIKELY OBJECTIONS
[What concerns might they have? Based on their industry, their situation, or patterns from similar leads.]

### VALUE-ADD OPPORTUNITIES
[What could you share with this person that would be genuinely useful — independent of your services?]
```

### Stage Gate
- [ ] PERSONALIZATION HOOKS has at least 3 entries (if you can't personalize, the sequence will be generic and ignored)
- [ ] THEIR SITUATION is specific (not "they need marketing help" — what specifically, and how do you know?)

**Kill condition:** If you have zero context beyond name and email, spend 5 minutes on LinkedIn before proceeding. A thin substrate produces generic follow-ups that get filtered as spam.

---

## Stage 02 · AMPLIFY — Sequence Generator

> Run immediately after Capture. Generates all emails in the sequence at once.

### Prompt

```
Generate a complete personalized follow-up sequence for this lead. Every email must reference something specific to THEM — not a template fill.

<lead-substrate>
[PASTE LEAD SUBSTRATE FROM STAGE 01]
</lead-substrate>

<content-dna>
[PASTE YOUR CONTENT DNA — for voice consistency]
</content-dna>

<recent-content>
[LIST 2–3 recent pieces of content or results you could reference in the sequence:]
- [e.g., "Blog post: 'Why Most Agency Proposals Lose' — published last week, strong engagement"]
- [e.g., "Client result: Helped [similar company] achieve [specific result] last month"]
</recent-content>

Generate the full sequence based on their category:

---

### IF HOT (5 emails, 14 days):

**Email 1 — Day 1: The Smart Response**
- Respond to their specific inquiry
- Show you understand their situation (reference personalization hooks)
- Offer one immediate insight they can use right now
- Suggest a next step (call, not just "let me know")
- Under 150 words

**Email 2 — Day 3: The Value Drop**
- Share something genuinely useful — article, framework, tip, tool
- Connected to their specific problem
- No pitch. Pure value.
- Under 120 words

**Email 3 — Day 6: The Proof**
- Brief case study of someone in a similar situation
- Specific results, not vague claims
- Natural bridge: "Your situation with [X] reminded me of this"
- Under 150 words

**Email 4 — Day 10: The Honest Check**
- Direct question: is this still a priority?
- No guilt. No manipulation.
- Make it easy to say "not now" — that's useful information
- Under 100 words

**Email 5 — Day 14: The Clean Close**
- Respect their time
- Leave the door open
- Offer a specific way to re-engage in the future
- Under 100 words

---

### IF WARM (7 emails, 30 days):

**Email 1 — Day 1: The Re-Connect**
- Reference your previous interaction specifically
- Share something useful that's happened since
- Under 120 words

**Email 2 — Day 5: The Insight**
- Share an industry observation relevant to their situation
- Position yourself as someone who pays attention to their space
- Under 120 words

**Email 3 — Day 9: The Case Study**
- Relevant result story
- Problem → Solution → Outcome format
- Connect it to their situation explicitly
- Under 150 words

**Email 4 — Day 14: The Quick Win**
- Give them something actionable they can implement in 5 minutes
- Make it good enough to work even if they never hire you
- Under 120 words

**Email 5 — Day 19: The Direct Ask**
- Ask directly: is solving [their problem] still a priority?
- Make it easy to respond: "Reply 1 for yes, 2 for later, 3 for no"
- Under 80 words

**Email 6 — Day 24: The Social Proof**
- Share a recent result with specific numbers
- Connect to their situation
- Mention limited availability or upcoming capacity change (only if true)
- Under 120 words

**Email 7 — Day 30: The Graceful Exit**
- Acknowledge you've reached out several times
- Offer to close the file
- P.S.: "Sometimes this email gets a reply of 'actually, I've been busy — let's talk.'"
- Under 100 words

---

### IF COLD (3 emails, 10 days):

**Email 1 — Day 1: Thought of You**
- Genuine reason you're reaching out now (not manufactured)
- Lead with value — new insight, new result, industry change
- Under 120 words

**Email 2 — Day 5: Free Resource**
- Share something concretely useful (guide, checklist, framework)
- "Yours whether or not we ever work together"
- Under 100 words

**Email 3 — Day 10: The Direct Ask**
- Three numbered options: 1=let's talk, 2=not now, 3=take me off your list
- "Whatever the answer, I appreciate your honesty"
- Under 80 words

---

For EVERY email across all sequences:
- Subject line (curiosity or specificity — never clickbait)
- Complete body (ready to send after 30 seconds of review)
- At least ONE reference to something specific to this lead
```

---

## Stage 03 · VALIDATE — Slop Gate

### Prompt

```
Quality-check this follow-up sequence before it enters the deployment queue.

<lead-substrate>
[PASTE LEAD SUBSTRATE]
</lead-substrate>

<sequence>
[PASTE ALL EMAILS FROM STAGE 02]
</sequence>

Run EVERY email through these kill conditions:

### KILL CONDITIONS

1. **PERSONALIZATION** — Does each email reference something specific to this lead? Search for their name, company, industry, or situation. If an email could be sent to any lead with a name swap, it FAILS.

2. **VALUE CHECK** — Does each email give something useful, or just ask for their time?

3. **PHRASE BLACKLIST** — Instant fail if any email contains:
   - "just checking in"
   - "touching base"
   - "I hope this finds you well"
   - "circling back"
   - "wanted to reach out"
   - "per my last email"
   - "I know you're busy, but..."

4. **DESPERATION CHECK** — Does any sentence sound needy, passive-aggressive, or manipulative? ("I noticed you haven't responded..." is passive-aggressive. Cut it.)

5. **VOICE FIDELITY** — Does this sound like a human wrote it, or like a CRM auto-responder?

6. **ARC COHERENCE** — Do the emails build on each other, or are they disconnected? The sequence should have a narrative arc, not just be a series of pings.

For each email: PASS / REPAIR (with specific rewrite) / KILL (with replacement from alternate angle)

Output the validated sequence.
```

---

## Response Handler (Stage 04)

> Run when a lead responds to any email in the sequence.

### Prompt

```
A lead just responded. Help me craft the right reply.

<lead-substrate>
[PASTE LEAD SUBSTRATE]
</lead-substrate>

<their-response>
[PASTE THEIR EXACT RESPONSE]
</their-response>

<which-email>
This was a reply to: [Email # in the sequence — e.g., "Warm sequence, Email 3"]
</which-email>

Determine the response type and generate the appropriate reply:

**IF POSITIVE** (they want to move forward):
- Warm, not salesy acknowledgment
- Suggest 2–3 specific times for a call
- Include one brief confidence-builder (a relevant result)
- Under 80 words

**IF "NOT NOW"** (interested but bad timing):
- Zero-pressure acknowledgment
- Ask for a specific timeframe ("Would September be better?")
- Offer to send something useful in the meantime
- Set a reminder for the date they suggest
- Under 60 words

**IF NEGATIVE** (not interested):
- Professional, dignified, brief
- Leave the door open without being clingy
- Remove from active sequence
- Under 40 words

**IF UNCLEAR** (can't tell what they mean):
- Brief clarifying question
- Make it easy to answer (yes/no or numbered options)
- Under 40 words

Output: The reply + what to do next (book call / set reminder / remove from sequence / ask for clarification)
```

---

## Stage 05 · OPTIMIZE — Sequence Feedback

> Run monthly.

### Prompt

```
Analyze follow-up performance and improve the sequences.

<performance-data>
Emails sent this month: [TOTAL]
Responses received: [TOTAL]
Response rate: [%]

By sequence type:
- Hot: [sent] sent, [responses] responses, [calls booked] calls, [deals closed] deals
- Warm: [sent] sent, [responses] responses, [calls booked] calls
- Cold: [sent] sent, [responses] responses

By email number (which email in the sequence gets responses?):
[List which specific emails generated replies]

Best performing email: [describe which one and what it said]
Worst performing email: [describe which one]

Direct feedback received: [any comments from leads about your outreach]
</performance-data>

<current-sequences>
[PASTE YOUR CURRENT HOT, WARM, AND COLD SEQUENCES]
</current-sequences>

Produce:

## FOLLOW-UP PERFORMANCE REPORT

### Response Rate Assessment
[Benchmark: Hot should be 30–50%, Warm 15–25%, Cold 8–15%. How do you compare?]

### Email-Level Analysis
[Which specific emails are carrying the sequence? Which are dead weight?]

### Pattern Recognition
[What do the emails that get responses have in common? Format, length, tone, value-add type?]

### Sequence Rewrites
[Rewrite the 2 weakest emails across all sequences based on what's working. Keep the strongest emails exactly as they are.]

### Timing Adjustments
[Should the cadence change? Are you sending too frequently or not frequently enough?]

### Updated Sequences
[Output the complete updated sequences — incorporating all improvements]
```

---

## Special: Lead Resurrection

> Run monthly for all leads cold 30+ days.

### Prompt

```
Batch-generate re-engagement messages for cold leads.

<cold-leads>
[List each cold lead:]
1. [Name] at [Company] — Originally interested in [service] — Last contact: [date] — Context: [notes]
2. [Name] at [Company] — [same format]
[List all]
</cold-leads>

<recent-wins>
[2–3 recent results you can reference]
</recent-wins>

<recent-content>
[2–3 recent content pieces or insights]
</recent-content>

For EACH lead, generate:
- A personalized re-engagement email (under 120 words)
- The specific angle/approach for this lead (why this approach for this person)
- Subject line

Requirements:
- Don't mention that they went quiet (no guilt)
- Lead with value (something useful for their specific situation)
- End with the numbered response format (1=yes, 2=later, 3=no)
- Each email must reference something specific to that lead

Batch these so I can send all of them in one 30-minute session.
```

---

## Special: Referral Sequence

> Run when a client engagement ends well.

### Prompt

```
Generate a referral request for a happy client.

<client>
Name: [CLIENT NAME]
Company: [COMPANY]
What I did: [SERVICE AND DELIVERABLES]
Results: [SPECIFIC OUTCOMES]
Relationship quality: [GREAT / GOOD — and why]
Their network: [WHO THEY LIKELY KNOW]
My ideal referral: [DESCRIBE YOUR PERFECT NEXT CLIENT]
</client>

Generate:

**Email 1 — The Seed (send with final deliverable):**
- Genuine thanks (reference specific moments from the engagement)
- State the results you achieved together
- Specific referral ask: describe exactly who would be a good fit (not "anyone who needs help")
- Make it easy: "Reply with their name and email — I'll handle the rest"
- Under 150 words

**Email 2 — The Direct Ask (1 week later, only if no response):**
- Brief, warm
- Include a "forwardable blurb" — a 3-sentence email they can forward to the referral
- Under 100 words + the forwardable blurb

Tone: Grateful and specific, never desperate.
```
