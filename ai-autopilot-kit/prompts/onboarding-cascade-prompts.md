# Onboarding Cascade — Stage Prompts

> Prompts for Cascade 02: Onboarding.
> Each prompt's OUTPUT format matches the next prompt's INPUT format.

---

## Stage 01 · CAPTURE — Client Substrate Generator

> Run when a new client submits their intake form.

### Prompt

```
You are processing a new client's intake form into a structured Client Substrate. This substrate will feed every downstream stage of onboarding — welcome email, kickoff agenda, project setup, and timeline.

<service-context>
My business: [YOUR BUSINESS TYPE AND SERVICES]
My process: [HOW A TYPICAL ENGAGEMENT WORKS]
My tools: [COMMUNICATION AND PROJECT MANAGEMENT TOOLS YOU USE]
Average engagement length: [TIMELINE]
</service-context>

<intake-responses>
[PASTE THE CLIENT'S RAW INTAKE FORM RESPONSES]
</intake-responses>

Produce a CLIENT SUBSTRATE with EXACTLY this structure:

## CLIENT SUBSTRATE — [Client Name], [Company]

### PROFILE
- Name: [full name]
- Company: [company name]
- Role: [their title]
- Industry: [their industry]
- Website: [URL]
- Communication preference: [email/Slack/other]
- Decision makers: [who else is involved]
- Feedback turnaround: [their stated response time]

### STATED PROBLEM
[Their problem in THEIR words — quote directly from intake form]

### ACTUAL NEED
[What they actually need, which may differ from what they stated. Read between the lines of their responses.]

### SUCCESS CRITERIA
[How they'll measure success — extract from their responses or infer from their goals. Make these specific and measurable.]

### CONSTRAINTS
- Budget: [stated or inferred]
- Timeline: [hard deadlines, seasonal windows]
- Technical: [platform limitations, tool requirements]
- Political: [stakeholder dynamics, approval processes]

### RED FLAGS
[Anything in their responses that could cause problems later:]
- Unrealistic expectations: [if any]
- Scope ambiguity: [if any]
- Missing information: [what they didn't answer or answered vaguely]
- Communication risks: [slow responder? Too many decision makers?]

### CLARIFICATION QUESTIONS
[3–5 specific questions to ask in the kickoff call, targeting the gaps and red flags above]

### QUICK WINS
[2–3 things you can deliver or demonstrate in the first week to build confidence]

### ENGAGEMENT NOTES
[Any other context that's useful for the engagement — brand guidelines, competitors mentioned, past experiences shared]
```

### Stage Gate
- [ ] The ACTUAL NEED field differs from or sharpens the STATED PROBLEM (if they're identical, you're not reading deeply enough)
- [ ] RED FLAGS section is honest (no client is perfect — if it's empty, you're being too generous)
- [ ] CLARIFICATION QUESTIONS are specific to this client (not generic discovery questions)

**Kill condition:** If the intake responses are too thin to produce a meaningful substrate (one-word answers, key sections blank), pause the cascade and request the client complete the form properly before proceeding.

---

## Stage 02 · AMPLIFY — Parallel Onboarding Generator

> Run immediately after Capture. Generates all onboarding documents in one pass.

### Prompt

```
Generate all onboarding documents for this client in one pass. Each document is a native output for its purpose — not a template fill.

<client-substrate>
[PASTE CLIENT SUBSTRATE FROM STAGE 01]
</client-substrate>

<service-context>
My business: [YOUR BUSINESS TYPE]
My voice: [CASUAL/PROFESSIONAL/FRIENDLY/DIRECT — or paste Content DNA]
My tools: [YOUR TOOLS — Slack, Google Drive, Notion, etc.]
Standard deliverables: [WHAT YOU TYPICALLY DELIVER]
</service-context>

Generate ALL of the following:

---

## 1. WELCOME EMAIL

Subject line: [specific to their situation — not "Welcome aboard!"]

Body:
- Acknowledge their specific problem/goal (from the substrate)
- Set expectations: exactly what happens next, in what order, by when
- Link to intake form (if not yet completed) or acknowledge receipt
- Personal touch that shows you read their responses carefully
- Tone: confident, warm, organized — they just spent money and need reassurance

Under 250 words. No corporate fluff.

---

## 2. KICKOFF CALL AGENDA

Format: [30 or 60] minute meeting

1. Quick intros + roles (X min)
2. Goals confirmation — reference their specific answers, ask clarification questions from the substrate (X min)
3. Process walkthrough — tailored to their constraints and preferences (X min)
4. Red flag discussion — address concerns surfaced in the substrate, tactfully (X min)
5. Quick wins preview — what they'll see in week 1 (X min)
6. Next steps + first deliverable timeline (X min)

Include: Pre-call prep instructions for the client (what to have ready, what to think about).

---

## 3. PROJECT SETUP CHECKLIST

[ ] Folder structure — exact folder names for this engagement
[ ] Tool access — which platforms, what permissions
[ ] Communication channel — set up and introductory message drafted
[ ] Contract/agreement — status check
[ ] Payment/invoicing — status check
[ ] Internal tracking — add to project management tool, time tracking, CRM
[ ] Milestone reminders — set for key dates from the timeline
[ ] Templates — copy relevant templates into project folder

Ordered by priority. First items are blockers; last items can wait.

---

## 4. PROJECT TIMELINE

| Week | Milestone | Deliverable | Client Action Needed |
|------|-----------|-------------|---------------------|
[Build from their deadlines + your process. Include client dependencies — what you need from them and by when.]

---

## 5. INTERNAL BRIEF

For your own reference (not shared with client):
- Client personality read (based on communication style in intake)
- Potential friction points to watch for
- Upsell opportunities (services that would help but weren't scoped)
- Engagement health indicators (what signals would tell you this is going well or poorly)
```

---

## Stage 03 · VALIDATE — Onboarding Quality Gate

### Prompt

```
Review these onboarding documents for a new client.

<client-substrate>
[PASTE CLIENT SUBSTRATE]
</client-substrate>

<onboarding-documents>
[PASTE ALL 5 DOCUMENTS FROM STAGE 02]
</onboarding-documents>

Check each document against these kill conditions:

1. PERSONALIZATION — Does each document reference this specific client's situation? Could you swap in a different client name and have it still make sense? If yes, it fails.

2. COMPLETENESS — Is anything missing that would cause a "we forgot to..." moment later?

3. TONE CALIBRATION — Does the welcome email reassure? Does the agenda feel structured but not rigid? Does the timeline feel achievable?

4. RED FLAG COVERAGE — Are the red flags from the substrate addressed in the agenda? (Not ignored — addressed.)

5. PROMISE AUDIT — Does the timeline promise anything you can't deliver? Does the welcome email set expectations you can't meet?

For each document: PASS or REPAIR (with specific fix).

Output the validated set.
```

---

## Stage 04 · DEPLOY — Post-Kickoff Summary

> Run after the kickoff call.

### Prompt

```
Turn my rough kickoff call notes into a polished summary email.

<client-substrate>
[PASTE CLIENT SUBSTRATE]
</client-substrate>

<call-notes>
[PASTE YOUR ROUGH NOTES — bullet points, fragments, shorthand, all fine]
</call-notes>

Generate a post-kickoff summary email:

Subject: "Kickoff Summary + Next Steps — [Project Name]"

1. QUICK RECAP — 3–5 bullet points of key decisions made (reference what they said, not just what you decided)

2. ACTION ITEMS — OURS
   - [ ] [Specific task] — by [date]
   [List all]

3. ACTION ITEMS — THEIRS
   - [ ] [Specific task] — by [date]
   [List all]

4. TIMELINE CONFIRMATION
   - Next deliverable: [what] by [when]
   - Next check-in: [date/time]
   - Project completion: [estimated date]

5. SHARED RESOURCES
   - Project folder: [link placeholder]
   - Communication channel: [link placeholder]

Closing: Brief, confident, forward-looking. Make them feel like they hired a professional.
```

---

## Stage 05 · OPTIMIZE — Intake Evolution

> Run after each engagement completes (or at the 30-day mark).

### Prompt

```
This client engagement is at [30 DAYS / COMPLETION]. Help me improve the onboarding cascade for next time.

<original-client-substrate>
[PASTE THE ORIGINAL CLIENT SUBSTRATE]
</original-client-substrate>

<current-intake-form>
[PASTE YOUR CURRENT INTAKE FORM QUESTIONS]
</current-intake-form>

<engagement-reflection>
Answer these honestly:
- What information did I wish I'd collected upfront? [ANSWER]
- What intake questions produced useless answers? [ANSWER]
- What surprised me about this engagement? [ANSWER]
- What would I do differently in the welcome sequence? [ANSWER]
- Did the kickoff agenda cover the right things? [ANSWER]
- Were the red flags accurate? Any I missed? [ANSWER]
- What did the client say about the onboarding experience? [ANSWER]
</engagement-reflection>

Produce:

## INTAKE SUBSTRATE UPDATES
- Questions to ADD: [with reasoning]
- Questions to CUT: [with reasoning]
- Questions to REWRITE: [old → new, with reasoning]

## WELCOME SEQUENCE UPDATES
- Changes to make based on this engagement

## STAGE GATE UPDATES
- New kill conditions or checks to add based on what went wrong (or almost went wrong)

## PATTERN LOG
[Add this engagement's learnings to a running pattern log. Over 10+ clients, patterns emerge that transform the onboarding cascade.]
```
