# The AI Autopilot Kit

### Cascade Kinetics™ for Agency Owners & Consultants

> Most AI kits give you prompts with brackets. You fill them in, get output, repeat. The output on day 90 is the same quality as day 1.
>
> This kit builds **cascades** — cyclical systems with feedback loops, stage gates, and substrates that evolve every time you run them. The system on day 90 is unrecognizable from day 1.

---

## The Five Cascades

| # | Cascade | What It Does | Time |
|---|---------|-------------|------|
| 01 | **Content** | One insight → five platform-native outputs. Feedback refines your voice weekly. | 60 min/week |
| 02 | **Onboarding** | Client signs → five parallel outputs trigger. Each engagement improves the next. | 35 min/client |
| 03 | **Proposal** | Discovery call → validated proposal in 90 minutes. Win/loss data refines the framework. | 40 min/proposal |
| 04 | **Review** | The meta-cascade. Processes signals from all other cascades every Friday. | 30 min/week |
| 05 | **Follow-Up** | Personalized sequences with slop gates. Response data improves sequences monthly. | 15 min/day |

---

## How Cascades Work

Every cascade follows five stages:

```
CAPTURE → AMPLIFY → VALIDATE → DEPLOY → OPTIMIZE
                                            ↓
                              (feedback loops back to CAPTURE)
```

- **Capture:** Extract signal from noise into structured substrate
- **Amplify:** One substrate → many platform-native outputs (not copies)
- **Validate:** Stage gates catch slop, auto-repair failures, kill bad output
- **Deploy:** Ship. The creative work is done upstream.
- **Optimize:** Performance data feeds back to refine upstream substrates

Read `methodology/cascade-kinetics.md` for the full framework.

---

## File Structure

```
ai-autopilot-kit/
├── README.md                          ← You are here
├── 00-QUICK-START.md                  ← Start here
│
├── methodology/
│   └── cascade-kinetics.md            ← The full Cascade Kinetics framework
│
├── cascades/                          ← Architecture guides (the "what" and "why")
│   ├── 01-content-cascade.md
│   ├── 02-onboarding-cascade.md
│   ├── 03-proposal-cascade.md
│   ├── 04-review-cascade.md
│   └── 05-follow-up-cascade.md
│
├── prompts/                           ← Stage prompts (the "how")
│   ├── content-cascade-prompts.md
│   ├── onboarding-cascade-prompts.md
│   ├── proposal-cascade-prompts.md
│   ├── review-cascade-prompts.md
│   └── follow-up-cascade-prompts.md
│
├── substrates/                        ← Living documents that evolve with use
│   └── (created when you run the cascades)
│
├── templates/                         ← Plug-and-play documents
│   ├── client-intake-form.md
│   ├── content-calendar-template.md
│   ├── proposal-template.md
│   ├── weekly-review-template.md
│   └── email-sequences/
│       ├── welcome-sequence.md
│       ├── nurture-sequence.md
│       └── re-engagement-sequence.md
│
├── dashboard/
│   └── index.html                     ← Interactive dashboard + prompt generator
│
├── sales-page/
│   └── index.html                     ← Sales page (Larkin Systems branding)
│
├── bonuses/
│   ├── roi-calculator.md
│   ├── ai-tool-stack-guide.md
│   └── 30-day-implementation-plan.md
│
├── launch/
│   └── distribution-plan.md
│
└── package.sh
```

---

## Quick Start

1. Read `methodology/cascade-kinetics.md` (10 min) — understand the architecture
2. Open `cascades/01-content-cascade.md` — start with the Content Cascade
3. Run the Stage 01a prompt from `prompts/content-cascade-prompts.md` to create your Content DNA
4. Run Stages 01–04 to produce your first week of content
5. On Friday, run Stage 05 with your engagement data — watch the cascade learn

See `00-QUICK-START.md` for the full walkthrough.

---

## The Key Difference

**Prompt kits:** Static. Fill in brackets. Same output forever. No feedback. No compounding.

**Cascade Kinetics:** Each prompt's output is the next prompt's input (substrate channeling). Performance data flows back upstream (feedback inhibition). Bad output gets caught and repaired before you see it (stage gates). The system learns from what shipped.

The 100th run is structurally better than the 1st — because the substrates evolved through 99 cycles of real-world feedback.
