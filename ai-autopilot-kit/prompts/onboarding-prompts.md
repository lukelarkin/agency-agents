# Client Onboarding Prompt Chains

> 8 copy-paste prompt chains for System 2: Automated Client Onboarding.
> Each prompt has [BRACKETS] where you fill in your specific information.

---

## Prompt Chain #1: Intake Form Optimizer

> **Used in:** System 2, Step 1 (One-time setup)
> **Purpose:** Refines your intake form so it extracts maximum info with minimum client effort

```
I run a [YOUR BUSINESS TYPE] that provides [YOUR SERVICES] to [YOUR TARGET CLIENTS].

Here's my current list of questions I ask new clients:

[PASTE YOUR CURRENT INTAKE QUESTIONS — even if they're rough or just a mental list]

Also, here are common problems I run into with new clients:
- [COMMON MISUNDERSTANDING #1]
- [COMMON MISUNDERSTANDING #2]
- [COMMON MISUNDERSTANDING #3]

Optimize my intake form:

1. **Cut questions** that don't change how I work (nice-to-know vs. need-to-know)
2. **Rewrite questions** so they're specific and easy to answer (replace open-ended with guided)
3. **Add questions** I'm missing that would prevent problems later
4. **Order them** from easiest to hardest (so clients build momentum)
5. **Add helper text** under tricky questions (examples of good answers)
6. **Estimate completion time** (target: under 10 minutes)

Output the final form with sections, questions, helper text, and answer format (text, multiple choice, etc.) — ready to build in Google Forms or Typeform.
```

---

## Prompt Chain #2: Welcome Sequence Builder

> **Used in:** System 2, Step 2 (One-time setup)
> **Purpose:** Generates your 5-email welcome sequence

```
I need a 5-email welcome sequence for new clients of my [YOUR BUSINESS TYPE].

**My services:** [WHAT YOU DELIVER]
**My process:** [BRIEF DESCRIPTION OF HOW AN ENGAGEMENT TYPICALLY WORKS]
**Tools I use:** [COMMUNICATION AND PROJECT MANAGEMENT TOOLS — Slack, email, Notion, etc.]
**Average project length:** [TIMELINE]
**What I need from clients:** [ACCESS, DOCUMENTS, FEEDBACK TURNAROUND, etc.]
**My brand voice:** [CASUAL/PROFESSIONAL/FRIENDLY/DIRECT — or paste Content DNA]

Create 5 emails:

**Email 1 (Send immediately after signing):** Welcome + intake form link + what to expect next
**Email 2 (Day 1):** "How we work together" — communication, meetings, deliverables explained
**Email 3 (Day 2):** Access and resources needed — what they need to provide/set up
**Email 4 (Day 3):** Kickoff call prep — agenda + what to prepare
**Email 5 (Day 5):** "We're starting!" — timeline, first deliverable preview, excitement

For each email, include:
- Subject line (tested for opens)
- Full email body
- Any links or attachments to reference [PLACEHOLDERS OK]

Tone: Professional but warm. They just spent money and need reassurance they made the right choice.
```

---

## Prompt Chain #3: Kickoff Call Agenda Generator

> **Used in:** System 2, Step 3 (Per client)
> **Purpose:** Creates a custom kickoff call agenda based on intake form answers

```
A new client just completed their intake form. Generate a customized kickoff call agenda.

**Client name:** [NAME]
**Company:** [COMPANY]
**Service they bought:** [YOUR SERVICE]
**Their intake form responses:**

[PASTE THE CLIENT'S INTAKE FORM ANSWERS]

Create:

1. **Kickoff call agenda** ([30 or 60] minute format):
   - Welcome and intros (time allocation)
   - Goals confirmation (based on their answers)
   - Process walkthrough (tailored to their situation)
   - Questions and concerns
   - Next steps and first deliverable

2. **Key questions to ask** based on their responses:
   - Anything that was vague or needs clarification
   - Follow-up questions that go deeper on their most important answers
   - Questions about constraints they didn't mention (budget changes, team availability, etc.)

3. **Red flags or concerns** you noticed in their responses:
   - Unrealistic expectations to address
   - Missing information that could cause problems
   - Scope concerns to clarify upfront

4. **Talking points** for building confidence:
   - Specific things to reference from their answers that show you read them carefully
   - Similar client successes to mention
   - Quick wins you can promise in week 1
```

---

## Prompt Chain #4: Project Setup Checklist Generator

> **Used in:** System 2, Step 4 (Per client)
> **Purpose:** Creates a complete setup checklist so nothing is forgotten

```
Generate a complete project setup checklist for a new client.

**Client name:** [NAME]
**Service type:** [YOUR SERVICE]
**Tools I use:** [LIST YOUR TOOLS — Google Drive, Notion, Slack, Figma, etc.]
**Typical project deliverables:** [WHAT YOU TYPICALLY DELIVER]

Create a checklist with these sections:

1. **Folder/File Structure:**
   - Exact folder names to create
   - Template files to copy
   - Shared drive/access setup

2. **Tools & Access:**
   - Accounts to create or invite them to
   - Permissions to set
   - Integrations to connect

3. **Communication Setup:**
   - Channel/thread to create
   - Introduction message to send
   - Recurring meeting to schedule

4. **Documents to Prepare:**
   - Contract/agreement status
   - NDA if needed
   - Payment/invoice setup
   - Welcome packet

5. **Internal Tracking:**
   - Add to project management tool
   - Set up time tracking
   - Add to client roster/CRM
   - Set milestone reminders

Format as a copy-paste checklist with [ ] checkboxes. Order by "do first" to "do last."
```

---

## Prompt Chain #5: Meeting Summary + Action Items

> **Used in:** System 2, Step 5 (Per client, after kickoff call)
> **Purpose:** Turns rough call notes into a polished summary email

```
I just finished a kickoff call with a new client. Turn my rough notes into a polished summary email.

**Client name:** [NAME]
**My rough notes from the call:**

[PASTE YOUR ROUGH NOTES — bullet points, fragments, shorthand all fine]

Create a professional summary email that includes:

1. **Subject line:** "Kickoff Summary + Next Steps — [Project Name]"

2. **Quick recap** (3–5 bullet points of key decisions made)

3. **Action items — Mine:**
   - [ ] Item (by [date])
   - [ ] Item (by [date])

4. **Action items — Theirs:**
   - [ ] Item (by [date])
   - [ ] Item (by [date])

5. **Timeline confirmation:**
   - Next deliverable: [what] by [when]
   - Next meeting: [date/time]
   - Project completion: [estimated date]

6. **Shared resources:**
   - Link to project folder: [PLACEHOLDER]
   - Link to communication channel: [PLACEHOLDER]

7. **Closing:** Brief, warm, confident — reinforce excitement about the project

Tone: Organized, professional, thorough. This email should make the client think "I'm in good hands."
```

---

## Prompt Chain #6: Automation Setup Guide

> **Used in:** System 2, Step 6 (One-time setup)
> **Purpose:** Step-by-step guide to automate your onboarding based on your tools

```
Help me set up automation for my client onboarding process.

**Tools I currently use:**
- CRM: [YOUR CRM — or "none, I use spreadsheets"]
- Email: [GMAIL / OUTLOOK / OTHER]
- Project management: [NOTION / ASANA / TRELLO / OTHER / NONE]
- Calendar: [GOOGLE CALENDAR / CALENDLY / OTHER]
- File storage: [GOOGLE DRIVE / DROPBOX / OTHER]
- Forms: [GOOGLE FORMS / TYPEFORM / OTHER]

**My onboarding steps:**
1. Client signs → send welcome email + intake form
2. Client completes intake → generate kickoff agenda
3. Kickoff call happens → send summary + action items
4. Project setup → create folders, channels, tracking

For my specific tool stack, create:
1. **Automation map:** Which steps can be automated vs. manual
2. **Setup instructions:** Step-by-step for each automation (specific to my tools)
3. **Trigger points:** What triggers each step
4. **Template locations:** Where to store each template for quick access
5. **Fallback plan:** What to do when automation breaks (it will)

Keep it simple. I want the 80/20 version — automate the highest-impact steps, keep the rest manual until I'm ready.
```

---

## Prompt Chain #7: Client Offboarding Sequence

> **Purpose:** Creates a professional offboarding process when a project ends

```
Help me create a client offboarding sequence for when a project wraps up.

**My business type:** [YOUR BUSINESS]
**Typical project length:** [TIMELINE]
**What I deliver:** [FINAL DELIVERABLES]
**Post-project support:** [ANY WARRANTY/SUPPORT PERIOD YOU OFFER]

Create a 3-step offboarding process:

**Step 1 — Project Wrap-Up Email:**
- Summary of everything delivered
- Links to all files/deliverables (organized)
- How to access support during [WARRANTY PERIOD]
- Feedback request (2–3 specific questions, not a generic survey)

**Step 2 — Testimonial Request (1 week later):**
- Warm, non-awkward request for a testimonial
- 3 specific prompts to make it easy for them to write one
- Option to give a video testimonial, written, or just a star rating

**Step 3 — Referral + Stay Connected (2 weeks later):**
- Thank them for the engagement
- Natural referral ask (specific, not generic)
- Offer to stay on their radar (newsletter, social, occasional check-ins)
- Door-open language for future work

Each email should feel genuine, not templated.
```

---

## Prompt Chain #8: Scope Change Request Handler

> **Purpose:** Generates professional responses to scope changes mid-project

```
A client has requested a scope change mid-project. Help me respond professionally.

**Original scope:** [WHAT WAS AGREED UPON]
**What they're asking for now:** [THE NEW REQUEST]
**Impact on timeline:** [YOUR ESTIMATE — or "I'm not sure, help me think through it"]
**Impact on budget:** [YOUR ESTIMATE — or "help me think through it"]
**Client relationship:** [GOOD / TENSE / NEW — context helps]

Generate:

1. **Assessment:** Is this a minor adjustment (absorb it) or a true scope change (requires a conversation)?

2. **Response email** with:
   - Acknowledge the request positively (don't make them feel bad for asking)
   - Clearly explain what's involved in making this change
   - Present options:
     - Option A: Add to current scope (new timeline + cost)
     - Option B: Swap for something already scoped (same timeline/cost)
     - Option C: Add as a follow-up project after current project completes
   - Recommendation (which option you'd suggest and why)
   - Next step (book a quick call, or just reply with their choice)

Tone: Confident and helpful, not defensive. This is an opportunity to demonstrate professionalism.
```
