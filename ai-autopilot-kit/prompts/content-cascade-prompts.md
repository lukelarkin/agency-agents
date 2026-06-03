# Content Cascade — Stage Prompts

> Prompts for Cascade 01: Content.
> Each prompt's OUTPUT format matches the next prompt's INPUT format.
> Run them in sequence. The cascade handles the rest.

---

## Stage 01 · CAPTURE — Content Substrate Generator

> Run every Monday. Takes one business event and extracts structured substrate.

### Input
- Your Content DNA substrate (paste from `substrates/content-dna.md`)
- One sentence about a real business event from the past week

### Prompt

```
You are a content strategist building a Content Substrate — a structured document that will feed an entire week of platform-native content creation.

<content-dna>
[PASTE YOUR CONTENT DNA HERE]
</content-dna>

<business-event>
[ONE SENTENCE: What happened this week? A client win, a mistake, a conversation, a pattern you noticed, a question someone asked, an industry observation.]
</business-event>

Extract the signal from this event and produce a Content Substrate with EXACTLY this structure:

## CONTENT SUBSTRATE — Week of [date]

### CORE INSIGHT
[One sentence. The single idea that everything this week builds from.]

### TENSION
[What makes this insight surprising, contrarian, or non-obvious? If there's no tension, this substrate will produce slop. Name the tension explicitly.]

### SEVEN ANGLES
For each angle, provide a one-line description AND a specific detail/example to make it concrete:
1. PERSONAL STORY — [angle + specific detail]
2. TACTICAL HOW-TO — [angle + specific detail]
3. CONTRARIAN TAKE — [angle + specific detail]
4. MISTAKE/LESSON — [angle + specific detail]
5. DATA/PROOF — [angle + specific detail]
6. BEGINNER-FRIENDLY — [angle + specific detail]
7. BEHIND-THE-SCENES — [angle + specific detail]

### TEN HOOKS
[Ten opening lines that would stop a scroll. First line only. Each must create curiosity, tension, or recognition. None can start with "I've been thinking about..." or "In today's..."]

### TALKING POINTS
[Five specific points, examples, data, or stories that can be referenced across multiple content pieces. Concrete, not abstract.]

### TENSION MAP
[Which angles pair with which platforms? Map the strongest angle to each platform based on what performs there.]
- LinkedIn story post → Angle #__
- LinkedIn tactical post → Angle #__
- Instagram → Angle #__
- X/Twitter thread → Angle #__
- Email newsletter → Angle #__
- Blog post → Angle #__

### CTA BRIDGE
[Three ways to connect this week's insight to the creator's offer. Subtle, not salesy. The reader should think "I should talk to this person" not "they're trying to sell me."]
```

### Stage Gate
Before proceeding to Stage 02, check:
- [ ] The TENSION field has a real tension (not "this is important" — that's not tension)
- [ ] At least 7 of 10 hooks create genuine curiosity (read them as a stranger would)
- [ ] The talking points are specific (names, numbers, concrete examples — not abstractions)

**Kill condition:** If the tension is weak, pick a different business event and re-run. A substrate without tension produces generic content downstream — guaranteed.

---

## Stage 01a · CAPTURE (One-Time) — Content DNA Builder

> Run once at setup. Creates the voice substrate that every future prompt references.

### Prompt

```
Analyze my writing to create a Content DNA substrate — a living reference document that ensures every piece of AI-generated content sounds like me, not like a language model.

<writing-samples>
[PASTE 3 EXAMPLES OF CONTENT YOU'VE WRITTEN THAT FEEL AUTHENTICALLY "YOU"]
</writing-samples>

<business-context>
Business: [WHAT YOU DO]
Audience: [WHO YOU HELP — be specific about their role, industry, pain points]
Topics: [5 THEMES YOU WANT TO BE KNOWN FOR]
Unique angle: [WHAT MAKES YOUR PERSPECTIVE DIFFERENT]
Anti-patterns: [WORDS, PHRASES, OR STYLES THAT ARE OFF-BRAND FOR YOU]
</business-context>

Create a CONTENT DNA document with EXACTLY this structure:

## CONTENT DNA — [Name]

### VOICE SIGNATURE
- Tone: [e.g., "Direct but warm. Teaches through stories, not lectures."]
- Sentence rhythm: [e.g., "Short declarative sentences. Uses fragments for emphasis. Occasionally a long flowing sentence to vary the pace."]
- Vocabulary level: [e.g., "Plain language. No jargon unless immediately defined. Reads at 8th grade level."]
- Personality markers: [e.g., "Self-deprecating humor. References specific numbers. Calls out BS directly."]

### SIGNATURE PATTERNS
- Opening style: [How they typically start — story, question, bold claim, etc.]
- Transition style: [How they move between ideas]
- Closing style: [How they end — CTA, question, callback, etc.]
- Formatting habits: [Short paragraphs, bold keywords, numbered lists, etc.]

### EMOTIONAL RANGE
- When teaching: [tone]
- When storytelling: [tone]
- When being vulnerable: [tone]
- When challenging the reader: [tone]

### POSITIONING
- Relationship to reader: [Peer? Mentor? Coach? Friend? Authority?]
- Implied status: [Established expert? Practitioner sharing lessons? Outsider with fresh eyes?]

### NEVER DO
- [Specific phrases, styles, or approaches to avoid]
- [e.g., "Never use 'leverage' as a verb"]
- [e.g., "Never start with 'In today's fast-paced world'"]
- [e.g., "Never use emojis in professional content"]

### ALWAYS DO
- [Specific patterns to maintain]
- [e.g., "Always include one specific number or data point"]
- [e.g., "Always end LinkedIn posts with a question"]

This document will be pasted into every future content prompt. Make it precise enough that someone reading it could write in this voice without ever meeting the person.
```

---

## Stage 02 · AMPLIFY — Platform-Native Generator

> Run every Monday after Capture. Produces all content for the week.

### Input
- Content Substrate from Stage 01
- Content DNA substrate

### Prompt

```
You are generating a full week of platform-native content from a single Content Substrate. Each piece must sound like the Content DNA voice — not like AI.

<content-dna>
[PASTE YOUR CONTENT DNA]
</content-dna>

<content-substrate>
[PASTE YOUR CONTENT SUBSTRATE FROM STAGE 01]
</content-substrate>

Generate ALL of the following in one pass. Each piece is a NATIVE ADAPTATION for its platform — not a reformatted copy.

---

## LINKEDIN — STORY POST
[Use the angle mapped in the Tension Map. 800–1,200 characters.]
- Hook: First line must stop a scroll. Use a hook from the substrate or write a better one.
- Story arc: Setup → tension → resolution → insight
- End with a specific question that invites comments (not "what do you think?")
- Format: Short paragraphs. Line breaks between every 2–3 sentences. Bold the key insight.

## LINKEDIN — TACTICAL POST
[Use the how-to or data angle. 600–1,000 characters.]
- Hook: Specific promise ("How to X without Y" or "The X framework for Y")
- Numbered steps or framework (3–5 steps, 1–2 sentences each)
- Each step must be actionable, not theoretical
- End with: "What would you add?" or a specific question

## INSTAGRAM POST
[Carousel concept OR short-form caption. Visual-first thinking.]
If carousel:
- Slide 1: Bold hook (8 words max, visually striking)
- Slides 2–6: One point per slide (headline + one sentence)
- Slide 7: Summary + CTA ("Save this for later" or "Share with someone who needs this")
- Caption: 150–200 words + 15–20 hashtags (mix of broad and niche)

If short-form:
- 3–5 sentences. Quotable. Save-worthy.
- Caption + hashtags

## X/TWITTER THREAD
[5–7 tweets. Use the contrarian or story angle.]
- Tweet 1: The hook. Create urgency to read the rest. No "Thread:" label.
- Tweets 2–6: One idea per tweet. Build momentum. Each tweet is independently valuable AND advances the argument.
- Final tweet: Summary + CTA + "Follow @[handle] for more on [topic]"
- Every tweet under 280 characters. Varied formats (some lists, some stories, some one-liners).

## EMAIL NEWSLETTER
[For your email list. 400–500 words max.]
- Subject lines: 3 options, ranked. Curiosity or specificity — no clickbait.
- Format: Story (3–4 sentences) → Lesson (3–4 sentences) → Bridge to CTA (1–2 sentences) → CTA (specific, one action) → P.S. (secondary CTA or personal note)
- Tone: Like emailing a smart friend. Not a marketing blast.

## BLOG POST
[800–1,200 words. SEO-aware.]
- Headline: Under 60 characters. Includes target keyword. Compelling to click.
- Meta description: Under 155 characters.
- Structure: Hook (not "In today's...") → Problem → Your take/framework → Actionable steps → Conclusion with CTA
- Format: Short paragraphs. Subheadings every 2–3 paragraphs. Bold key phrases.
- Include 3 internal linking suggestions (topics to link to).
- Include one quotable excerpt for social promotion.
```

---

## Stage 03 · VALIDATE — Quality Gate

> Run immediately after Amplify. Catches slop before you see it.

### Prompt

```
You are a quality gate for content. Your job is to catch problems before this content ships.

<content-dna>
[PASTE YOUR CONTENT DNA]
</content-dna>

<drafts>
[PASTE ALL DRAFTS FROM STAGE 02]
</drafts>

For EACH piece, evaluate against these kill conditions:

### KILL CONDITIONS
1. VOICE FIDELITY — Does this sound like the Content DNA, or has it drifted into generic AI tone? Look for: passive voice, corporate jargon, filler phrases, hedging language ("It's important to note that..."), or sentences that could appear in any business's content.

2. PLATFORM NATIVITY — Would this blend in on the platform, or does it read like a cross-post? A LinkedIn post should not read like a tweet. An email should not read like a blog post.

3. HOOK STRENGTH — Does the first line create genuine curiosity, tension, or recognition? Or does it start with a setup that requires patience?

4. SLOP DETECTION — Check for: empty-calorie sentences (sound good, say nothing), generic advice (could apply to any industry), and statements without specificity (no names, numbers, or concrete examples).

5. CTA CLARITY — Is there a specific action? Or does it trail off?

### For each piece, output:

**[Platform name]**
- Voice: PASS / REPAIR (+ what to fix)
- Nativity: PASS / REPAIR (+ what to fix)
- Hook: PASS / REPAIR (+ what to fix)
- Slop: PASS / REPAIR (+ what to fix)
- CTA: PASS / REPAIR (+ what to fix)
- Overall: PASS / REPAIR / KILL

### For any REPAIR:
Rewrite the failing section. Keep the passing sections exactly as they are.

### For any KILL:
Replace the entire piece using an alternate angle from the Content Substrate.

Output the final validated set, clearly marked as VALIDATED DRAFTS.
```

---

## Stage 05 · OPTIMIZE — Feedback Processor

> Run every Friday. Performance data refines your upstream substrates.

### Prompt

```
You are the feedback loop for a content cascade. Your job is to process performance data and produce specific upstream modifications.

<content-dna>
[PASTE YOUR CURRENT CONTENT DNA]
</content-dna>

<this-weeks-substrate>
[PASTE THIS WEEK'S CONTENT SUBSTRATE]
</this-weeks-substrate>

<performance-data>
[For each piece published this week, provide:]

LinkedIn story: [impressions] impressions, [likes] likes, [comments] comments, [shares] shares
LinkedIn tactical: [impressions] impressions, [likes] likes, [comments] comments
Instagram: [reach] reach, [likes] likes, [saves] saves, [shares] shares
X thread: [impressions] impressions, [likes] likes, [retweets] retweets, [replies] replies
Email: [open rate]% open, [click rate]% click, [replies] replies, [unsubscribes] unsubscribes
Blog: [page views] views, [avg time] avg time on page, [bounce rate]% bounce

[Also note: Which piece felt best to you? Which felt off? Any direct feedback from readers?]
</performance-data>

<previous-weeks-data>
[Paste last 3–4 weeks of performance data if available, or say "first week"]
</previous-weeks-data>

Produce:

## PERFORMANCE REPORT

### This week's winner
[Which piece and WHY — what specifically about it worked. Not "it resonated" — what structural element drove performance.]

### This week's underperformer
[Which piece and WHY — what specifically failed. Hook? Platform fit? Topic? Voice drift?]

### Pattern recognition
[What patterns emerge across this week and previous weeks? Correlations between format, topic, hook style, and performance.]

## UPSTREAM MODIFICATIONS

### Content DNA updates
[Specific modifications to the Content DNA substrate. Examples:
- "Add to ALWAYS DO: 'Use numbered frameworks in LinkedIn tactical posts — they consistently outperform paragraph-style tips'"
- "Add to NEVER DO: 'Avoid starting email subject lines with questions — open rates drop 15%'"
- "Update VOICE SIGNATURE: Add 'Uses more direct, first-person narrative in stories — third-person case studies underperform by 40%'"]

### Hook library additions
[Hooks from this week that performed well — add them to a running hook library for future Amplify stages]

### Angle preferences
[Which of the 7 standard angles performed best this week? Update the weighting for future Tension Maps.]

### Recommended next week's capture direction
[Based on what's working, what kind of business event should feed next week's Capture stage? Be specific.]

Output the updated Content DNA at the end, clearly marked as UPDATED CONTENT DNA — ready to paste into next week's prompts.
```

---

## Substrate Evolution

After each cycle, your Content DNA substrate should be updated with the Optimize stage's modifications. Over 12 weeks:

- Weeks 1–3: Rough calibration. Big voice adjustments.
- Weeks 4–6: Hook library grows. Angle preferences emerge.
- Weeks 7–9: Feedback data compounds. Output quality jumps noticeably.
- Weeks 10–12: The cascade is tuned. Your Content DNA is a precision instrument.

Save each week's Content DNA version. If you ever want to revert or compare, the history is there.
