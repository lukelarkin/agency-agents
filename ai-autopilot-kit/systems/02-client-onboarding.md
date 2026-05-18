# System 2: Automated Client Onboarding

## The Problem

Every new client costs you **3–5 hours** of back-and-forth: sending intake forms, answering the same questions, setting up folders, writing welcome emails, scheduling kickoff calls. Multiply that by 4 new clients/month and you're burning **12–20 hours/month** just getting people started — before you do any actual work. Worse, inconsistent onboarding makes you look disorganized and starts the relationship on shaky ground.

## Before (What You're Doing Now)

- Manually emailing each new client a list of questions (different questions each time because you forget what to ask)
- Creating project folders from scratch for every client
- Writing a custom welcome email that takes 30 minutes and says roughly the same thing every time
- Forgetting to send important documents (contracts, NDAs, payment links) until the client asks
- No standard process — Client A got a great experience, Client B got chaos
- Spending the first 2 weeks of every engagement playing catch-up on information you should've collected upfront

## After (With This System Running)

- New client signs → you trigger a 3-step sequence that takes 10 minutes total
- Intake form collects everything you need before the first call (no back-and-forth)
- Personalized welcome email goes out within 1 hour (feels custom, takes 3 minutes)
- Kickoff call agenda is auto-generated based on their intake form answers
- Every client gets the same professional experience, every time
- You start doing real work on Day 1 instead of Day 7

## Step-by-Step Implementation

### Step 1: Create Your Master Intake Form (One-Time — 30 minutes)

Open `templates/client-intake-form.md` and customize the template with your specific questions.

Then run **Prompt Chain #1: Intake Form Optimizer** from `prompts/onboarding-prompts.md`. This refines your questions so they extract maximum useful information with minimum client effort.

**You'll need:**
- Your list of "things I always need to know about a new client"
- Your service description (what you actually deliver)
- Common client mistakes/misunderstandings you want to prevent upfront

### Step 2: Build Your Welcome Email Sequence (One-Time — 20 minutes)

Run **Prompt Chain #2: Welcome Sequence Builder**.

This generates a 5-email welcome sequence. See `templates/email-sequences/welcome-sequence.md` for the full template.

The sequence:
1. **Email 1 (Immediate):** Welcome + intake form link + what to expect
2. **Email 2 (Day 1):** "Here's how we work together" — your process explained
3. **Email 3 (Day 2):** Resources, tools, and access they need to provide
4. **Email 4 (Day 3):** Kickoff call scheduling link + pre-call prep
5. **Email 5 (Day 5):** "We're starting!" — project timeline + first deliverable preview

### Step 3: Generate Kickoff Call Agenda (Per Client — 5 minutes)

After the client submits their intake form, run **Prompt Chain #3: Kickoff Call Agenda Generator**.

Paste the client's intake form responses. It produces:
- Customized meeting agenda (30 or 60 min format)
- Key questions to ask based on their specific responses
- Red flags or areas to clarify
- Next steps to confirm during the call

### Step 4: Create Client Folder Structure (Per Client — 3 minutes)

Run **Prompt Chain #4: Project Setup Checklist Generator**.

Input: Client name + service type. Output: A complete checklist of everything to set up (folders, tools, access, documents) with nothing forgotten.

### Step 5: Send Post-Kickoff Summary (Per Client — 5 minutes)

After the kickoff call, run **Prompt Chain #5: Meeting Summary + Action Items**.

Input: Your rough notes from the call. Output: A polished summary email with:
- Key decisions made
- Action items (yours and theirs) with deadlines
- Next meeting date
- Link to shared workspace/folder

### Step 6: Automate the Trigger (One-Time — 15 minutes)

Set up a simple trigger so this system activates automatically:
- **If you use a CRM:** Create a "New Client" status that triggers your welcome email
- **If you use email:** Create a draft template sequence in Gmail/Outlook
- **If you use nothing:** Create a checklist in your notes app and follow it manually

Run **Prompt Chain #6: Automation Setup Guide** for step-by-step instructions based on YOUR specific tools.

## Prompt Cross-Reference

| Step | Prompt Chain | File |
|------|-------------|------|
| 1 | #1: Intake Form Optimizer | `prompts/onboarding-prompts.md` |
| 2 | #2: Welcome Sequence Builder | `prompts/onboarding-prompts.md` |
| 3 | #3: Kickoff Call Agenda Generator | `prompts/onboarding-prompts.md` |
| 4 | #4: Project Setup Checklist Generator | `prompts/onboarding-prompts.md` |
| 5 | #5: Meeting Summary + Action Items | `prompts/onboarding-prompts.md` |
| 6 | #6: Automation Setup Guide | `prompts/onboarding-prompts.md` |

Also see:
- `templates/client-intake-form.md` — Ready-to-use intake form
- `templates/email-sequences/welcome-sequence.md` — 5-email welcome flow
- **Prompt Chains #7–#8** for advanced onboarding workflows (client offboarding, scope change requests)

## "Done Right" Checklist

After onboarding your first client with this system, verify:

- [ ] Your intake form collected all the information you needed before the first call
- [ ] The client received a welcome email within 1 hour of signing
- [ ] You had a structured kickoff call agenda (not winging it)
- [ ] The client said something like "wow, you're really organized" (this happens every time)
- [ ] You sent a post-call summary with clear action items and deadlines
- [ ] Total time from "client signed" to "project kicked off" was under 48 hours
- [ ] You spent less than 30 minutes total on the entire onboarding process
- [ ] Nothing was forgotten (contract, NDA, payment, access, logins — all handled)

## Estimated Time Savings

| Task | Before | After | Saved |
|------|--------|-------|-------|
| Intake form creation/sending | 30 min | 5 min | **25 min** |
| Welcome email(s) | 45 min | 3 min | **42 min** |
| Kickoff call prep | 30 min | 5 min | **25 min** |
| Project/folder setup | 20 min | 3 min | **17 min** |
| Post-kickoff summary | 30 min | 5 min | **25 min** |
| **Total per client** | **2 hrs 35 min** | **21 min** | **2 hrs 14 min** |

At 4 new clients/month and $75/hr, that's **$670/month** in recovered time.
