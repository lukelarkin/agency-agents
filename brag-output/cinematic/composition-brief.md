# Hyperframes Composition Brief: Larkin Systems — The moat is underneath

## Objective
A 25-second cinematic brag film for larkin.systems built from the four-system-moat case study, not the landing page.

## Output
- Composition directory: `brag-output/cinematic/composition/`
- Rendered video: `brag-output/cinematic/brag.mp4`
- Format: landscape — 1920x1080, 30fps
- Duration: 25 seconds

## Source Material
- Project root: /home/user/larkin-systems
- Primary files read: src/components/case-studies/four-system-moat.ts (copy + five SVG infographics: five-agent pipeline, pre-hearing timeline with ranked parcels, five-layer knowledge architecture, 14-deliverable QA gate, escalation timeline), src/components/sections/{hero,insight,work}.tsx, src/app/globals.css, CLAUDE.md
- Product name: Larkin Systems
- Tagline / strongest claim: "Anyone can run ads. The moat is underneath."
- Key UI or visual moment to recreate: the four case-study infographics, re-staged at video scale and put in motion
- Copy that must appear verbatim or trimmed from the case study:
  - Anyone can run ads. / The moat is underneath.
  - 01 The dirt before the hearing · 2.3-mile sewer main extension · septic-only for decades · flagged pre-hearing · 2wk · first contact placed before the hearing
  - 02 The permit in their language · County code / Operational intelligence / Per-reviewer profiles / Denial playbook / Edge cases · The moat · feasibility checks, denial rebuttals, code lookups citing the ordinance section · loaded against the two relevant county codes
  - 03 The campaign, audited · four producer agents · 14 launch-ready deliverables · Meta Housing Special Ad Category compliance gap that would have disabled the entire ad set on day one · twelve numerical conflicts · all reconciled pre-launch
  - 04 The lead, in 60 seconds · auto-text within 60 seconds · in the builder's voice · text at 1 minute, text at 15 minutes, email at 30, personal call within 2 hours · 6-hour window collapsed to under 5 · 8× conversion
  - Larkin Systems · Operations systems that ship. · larkin.systems
- Nothing invented: the ad card is a skeleton (no ad copy), the map is a stylized illustration with the case study's numbers, no ordinance numbers are shown.

## Creative Direction
- Tone preset: cinematic
- Creative direction: the camera is the argument; a descent through four layers, then the reveal of the stack
- Interpretation: all-caps Geist Bold, zoom-through transitions as the single transition language, hard power4 slams on strong cues, a persistent depth meter, one 3D camera move at the end
- Angle / Hook / Outro: see brag-plan.md
- Avoid: generic SaaS language, forbidden vocabulary from the repo's CLAUDE.md, exclamation points, "We " sentences, any colors or fonts outside the brand tokens

## Visual Identity
- Background #0B0B0D · surface #141416 · hairline lifted to #2A2A2F · text #EDEDE7 · muted lifted to #9A9AA0 · copper #D4A574
- Display: Geist Bold 700 (local woff2); labels/numbers: Geist Mono 500 (local woff2)

## Storyboard
Use `brag-plan.md` as the creative contract. Six scenes: Surface 0–3.7, 01 Dirt 3.7–8.9, 02 Permit 8.9–13.3, 03 QA 13.3–18.5, 04 Lead 18.5–22.6, Stack 22.6–25.

## Audio
- Music: assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3 at 0.32, volume lane fade in 0–0.4 and fade out 23.4–25
- Cue source: bundled vol-12 preset; locks at 8.19, 12.55, 17.47, 20.19, 21.84, 22.37, 23.46; parcel ranks on 6.56/7.09/7.64
- Audio-reactive: assets/audio-data.js (30fps, rms + bass) drives glow opacity/scale and the meter indicator
- SFX (own track each): impactBell_heavy_000 @0.5, impactSoft_heavy_003 @2.7 and @12.55 and @21.84, impactSoft_medium_001/004 on each dive (3.72, 8.92, 13.32, 18.52), bong_001 @8.19, impactBell_heavy_004 @17.47, click_003 @20.19, impactBell_heavy_003 @23.46

## Hyperframes Instructions
Domain skills loaded: core, animation (3d-camera-flight, camera-journey, transitions/css-scale zoom-through, svg-path-draw, stat fills), creative (audio-reactive, video-composition), keyframes, cli. Local assets only (GSAP vendored). `npx hyperframes check` passes with zero errors; the only remaining info finding is a transient tick occluded mid-flight in the document sequence.
