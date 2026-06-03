# Cascade 05: Follow-Up

> 80% of deals close after the 5th touchpoint. 90% of people stop after 1.
> The cascade makes follow-up systematic, personal, and self-improving.

---

## Why Pipelines Fail Here

The standard approach: lead comes in → you respond → they go quiet → you send "just checking in" → silence → you forget about them → they hire your competitor.

This pipeline has the worst combination of failure modes. **F-01 (junk signal):** your follow-ups are so generic they get filtered as noise. **F-04 (irreversible):** a robotic or poorly timed message doesn't just fail — it actively damages the relationship. And the absence of follow-up is its own irreversible failure: the prospect assumes you're not interested.

---

## The Cascade Architecture

```
     ┌──────────────────────────────────────────────────┐
     │                                                  │
     ▼                                                  │
  CAPTURE ───→ AMPLIFY ───→ VALIDATE ───→ DEPLOY ───→ OPTIMIZE
  (lead          (personalized  (slop       (send)      (response
   substrate)     sequence)      gate)                   analysis)
                     │
                     ├── Hot sequence (14 days, 5 touches)
          AMPLIFY ──┤── Warm sequence (30 days, 7 touches)
                     └── Cold sequence (10 days, 3 touches)
```

---

## Stage 01 · CAPTURE

**What happens:** A lead becomes a structured Lead Substrate.

Every lead enters the cascade as a substrate: who they are, where they came from, what they need, what context you have, and which sequence they belong in.

The Capture prompt categorizes:
- **Hot:** Inquired in the last 48 hours. Active interest.
- **Warm:** Showed interest 1–4 weeks ago, went quiet.
- **Cold:** No contact in 30+ days. Relationship needs reactivation.

**Run:** `prompts/follow-up-cascade-prompts.md` → Stage 01 prompt

**Input:** Lead information (name, company, source, inquiry, context, last contact)
**Output:** Lead Substrate (structured profile, category, recommended sequence, personalization hooks)

**Kill condition:** If you have zero context about a lead beyond their name and email, the substrate is too thin to personalize effectively. Research them first — 5 minutes on LinkedIn gives you enough to pass the gate.

---

## Stage 02 · AMPLIFY

**What happens:** The Lead Substrate generates a personalized sequence — not a template fill.

Each email in the sequence is built from the Lead Substrate, not from a generic template with brackets. The prompt generates all emails in the sequence at once so they form a coherent arc:

**Hot sequence (5 emails, 14 days):**
- Day 1: Respond to their inquiry with a specific insight about their situation
- Day 3: Share something useful (article, tip, framework) relevant to their problem
- Day 6: Brief case study of someone in a similar situation
- Day 10: Honest check-in — is this still a priority?
- Day 14: Clear next step or graceful close

**Warm sequence (7 emails, 30 days):**
- Each email delivers standalone value (a tip, an insight, a resource)
- Each email references their specific situation
- The arc moves from "being helpful" to "making a specific offer"
- Final email offers a clean exit with dignity

**Cold sequence (3 emails, 10 days):**
- Day 1: "Thought of you" with a genuine reason
- Day 5: Value drop (free resource relevant to their problem)
- Day 10: Direct ask with numbered response options (1 = yes, 2 = later, 3 = no)

**Run:** `prompts/follow-up-cascade-prompts.md` → Stage 02 prompt

**Input:** Lead Substrate + Content DNA (for voice consistency) + recent content/results to reference
**Output:** Complete personalized sequence (all emails, ready to send)

**Signal amplification:** One Lead Substrate → an entire multi-touch sequence, each email native to the relationship stage.

---

## Stage 03 · VALIDATE

**What happens:** The slop gate catches everything that sounds automated.

Every email runs through kill conditions:

1. **Personalization check** — Does this email reference something specific to *this* lead? (Not "your business" — their actual business, by name, with specifics.)
2. **Value check** — Does this email give something useful, or is it just asking for their time?
3. **Desperation check** — Does any sentence sound needy, pushy, or passive-aggressive?
4. **Phrase blacklist** — Instant kill if the email contains: "just checking in," "touching base," "I hope this finds you well," "circling back," "wanted to reach out."
5. **Voice fidelity** — Does this sound like you wrote it, or like a CRM auto-responder?

Emails that fail get auto-repaired. Emails that fail twice get rewritten from a different angle.

---

## Stage 04 · DEPLOY

**What happens:** Daily execution block. 15 minutes, every morning.

1. Check your Lead Tracker for today's scheduled touchpoints
2. Review the pre-generated email (already personalized in Stage 02, validated in Stage 03)
3. Send (or adjust if circumstances changed)
4. Log the touchpoint

**When a lead responds,** the cascade handles it:

**Run:** `prompts/follow-up-cascade-prompts.md` → Response Handler prompt

**Input:** Their response + your conversation history + Lead Substrate
**Output:**
- If positive: Next steps reply + meeting scheduling language
- If "not now": Graceful nurture response + calendar reminder for re-engagement
- If negative: Professional close-out that leaves the door open
- If unclear: Clarifying question that's easy to answer

---

## Stage 05 · OPTIMIZE

**What happens:** Response data feeds back to improve sequences.

Monthly, the Optimize prompt analyzes:
- **Response rates by sequence type** — Is hot outperforming warm? By how much?
- **Response rates by email number** — Which email in each sequence gets the most replies? Which gets zero?
- **Response rates by day/time** — When are leads most likely to respond?
- **Message analysis** — What do the emails that get replies have in common? What about the ones that get ignored?
- **Sequence rewrite** — The two weakest emails in each sequence get rewritten based on what's working

**Run:** `prompts/follow-up-cascade-prompts.md` → Stage 05 prompt

**Input:** Response data from the past month + current sequences
**Output:** Updated sequences + performance report + recommendations

**Feedback inhibition:** The sequence evolves. Month 1 sequences are good. Month 6 sequences are calibrated to your specific market, your specific offer, and the response patterns of your specific leads.

---

## Cross-Cascade Connections

**Content → Follow-Up:** High-performing content becomes value-add material. Instead of inventing something useful to share in each follow-up, you reference content that already proved it resonates. "I wrote about [topic] recently — given what you told me about [their situation], I thought you'd find this useful."

**Follow-Up → Proposal:** When a lead responds positively, their Lead Substrate transfers into the Proposal Cascade's Capture stage. You have full context: their original inquiry, every touchpoint, their responses, their timing patterns. The proposal reflects months of relationship data, not a single discovery call.

**Review → Follow-Up:** The Review Cascade identifies which follow-up activities drive pipeline movement. "Warm sequence is converting at 15% — double down. Cold reactivation is converting at 2% — reduce investment and redirect time to warm leads."

---

## Special Operations

### Lead Resurrection (Monthly)

Run once a month for all leads that have been cold for 30+ days:

**Run:** `prompts/follow-up-cascade-prompts.md` → Resurrection prompt

**Input:** All cold Lead Substrates + recent wins/content
**Output:** Batch of personalized re-engagement messages (one per lead)

Expect 10–20% response rate. Even 10% of 20 cold leads = 2 conversations you weren't having.

### Referral Sequence (Per happy client)

When a client engagement ends well, the cascade generates a referral ask:

**Run:** `prompts/follow-up-cascade-prompts.md` → Referral prompt

**Input:** Client name, engagement details, results achieved
**Output:** 2-email referral sequence + forwardable intro blurb the client can send

---

## Time Investment

| Stage | Time | Frequency |
|-------|------|-----------|
| 01 · Capture | 5 min | Per new lead |
| 02 · Amplify | 5 min | Per new lead |
| 03 · Validate | 3 min | Per new lead |
| 04 · Deploy | 15 min | Daily |
| 05 · Optimize | 15 min | Monthly |
| **Total** | **~15 min/day** + 15 min/month |

Previous approach: Either 0 min/day (no follow-up, leaving money on the table) or 60 min/day (manual, inconsistent, draining).

**Revenue impact:** If consistent follow-up closes one additional deal per month at $3,000, that's $36,000/year from a system that takes 15 minutes a day. This cascade has the highest ROI in the kit.
