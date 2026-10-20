# Hyperframes Composition Brief: Larkin Systems

## Objective
Create a short launch-style brag video for Larkin Systems (larkin.systems).

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 24.5 seconds

## Source Material
- Project root: /home/user/larkin-systems (Next.js 16 app, repo lukelarkin/larkin-systems)
- Primary files read: src/app/page.tsx, src/app/layout.tsx, src/app/globals.css, src/components/sections/{hero,proof,method,insight,work,operator,endorsements,cta,footer}.tsx, CLAUDE.md
- Product name: Larkin Systems
- Tagline / strongest claim: "Not another AI demo. Operations systems that ship."
- Key UI or visual moment to recreate: the hero (line-masked headline over drifting copper glows with the signal-path SVG), the proof strip (four Geist Mono count-ups on a hairline grid), the work tile grid, the insight quote, the final CTA block, the footer lockup
- Copy that must appear verbatim:
  - Larkin Systems
  - Not another AI demo.
  - Operations systems that ship.
  - Book the diagnostic
  - 12+ production systems shipped / 60+ unit property portfolio deployed / 9 verticals with shipped work / 1 operator end-to-end
  - Systems currently running / Running in production right now.
  - Custom home building / Treasure Valley · In production
  - Property management / Western PA
  - Commercial cleaning / Idaho multi-site
  - Read the case study →
  - Anyone can run ads. The moat is underneath.
  - From a recent build — Custom home building / Treasure Valley
  - No pitch deck. No proposal template. Just the call.
  - Built in Idaho · Deployed everywhere
  - larkin.systems
- Tile body copy (trimmed from the site's tiles, no invented words):
  - "Four-system stack behind a Meta lead-gen launch. Response window collapsed from 6 hours to under 5 minutes."
  - "Tenant screening operations system for a 60+ unit portfolio. Fair Housing compliance built into the architecture, not bolted on."
  - "AI front desk for a multi-site cleaning operator's inbox. Every inbound email read and sorted into seven types."

## Creative Direction
- Tone preset: polished
- Creative direction: quiet premium product film — "restraint is the moat"
- Interpretation: fewer scenes, longer holds, soft cuts over one persistent background; motion borrowed from the site itself (line-mask rises, hairline draws, fade-in-up, drifting glows); copper on one element per viewport
- Angle: the site's thesis is restraint, so the video is a precise 24-second walk down the real page at video scale, letting the site's own copy brag.
- Hook: near-black, breathing copper glow, eyebrow settles, then "Not another AI demo." rises from a line mask at 1.09s with one soft impact.
- Outro / punchline: "No pitch deck. No proposal template. Just the call." → Book the diagnostic → lockup "Larkin Systems · Built in Idaho · Deployed everywhere · larkin.systems"
- Avoid:
  - Generic SaaS language (none of the forbidden vocabulary in the repo's CLAUDE.md: unlock, empower, leverage, seamless, robust, etc.)
  - Abstract filler visuals, equalizers, particles
  - Unrelated visual redesign — stay inside the brand tokens and Geist only
  - Exclamation points; sentences starting with "We"

## Visual Identity
- Background: #0B0B0D; surface #141416; surface-2 #1A1A1D; hairline #1E1E22
- Text: #EDEDE7; muted #7A7A7F (lift muted text where WCAG requires)
- Accent: #D4A574 (hover #E8B98A)
- Display font: Geist Sans 600 (local woff2 in assets/fonts via @font-face), tracking -0.025em
- Body font: Geist Sans 400; Geist Mono 500 for labels, numbers, tags, chips
- Visual references from the project: hero copper radial glows (rgba(212,165,116,0.18) at 70% 30%, 0.10 at 20% 85%), hero signal-path SVG (three copper strokes, hex nodes, packet dots), proof grid hairline dividers, work tile (surface, 1px hairline grid, mono tag, copper-dot chip, outline button), insight hairline 56px copper, copper underline on "moat", btn-primary copper with near-black text, footer mono line

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hero — 7.0s — eyebrow, "Not another AI demo." / "Operations systems that ship.", signal path draw, Book the diagnostic
2. Proof strip — 4.5s — 12+ / 60+ / 9 / 1 count-ups with labels, hairline-divided band
3. Running in production — 4.5s — eyebrow + headline, three work tiles arriving one per beat
4. Insight — 3.3s — hairline draw, "Anyone can run ads." / "The moat is underneath." (copper moat + underline), mono attribution
5. The call — 3.07s — three lines one per beat, copper button lands
6. Lockup — 2.13s — Larkin Systems, Built in Idaho · Deployed everywhere, larkin.systems

## Audio
- Audio role: warm bed with sparse professional accents
- Audio arc: bed from frame 0 (fade in 0.5s); accents bracket the hook, the stat sequence, the tiles, the button; the insight scene is bed-only; one bong on the lockup as the bed fades out over the last 1.6s
- Music: assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3
- Music treatment: volume 0.30, fade in 0–0.5s, fade out 22.9–24.5s via the volume automation lane
- Music cue guidance: bundled preset `<brag-skill>/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.{md,json}` (109.96 BPM). Strong cue locks: 8.74, 13.11, 17.47, 19.66, 22.93. Beat grid for sequences: stats 7.64/8.19/8.74/9.29, tiles 12.55/13.11/13.64, CTA lines 19.66/20.19/20.75.
- Audio-reactive treatment: subtle; per-frame bands pre-extracted to assets/audio-data.json (30fps, 8 bands) with the hyperframes-creative extraction script; bass/RMS drives the copper glows' opacity and scale by a few percent only
- Audio-coupled moments:
  - Hero line 1 landing — impactSoft_medium_001 @1.05
  - Stats first/last — drop_002 @7.64, @9.29
  - Tiles — drop_001 @12.55, @13.11, @13.64
  - Button — impactSoft_medium_004 @21.28
  - Lockup — bong_001 @22.93
- SFX selection guidance: low HF-risk files only (sfx-analysis.md "safest picks"); volumes 0.45–0.6
- SFX analysis guidance: `<brag-skill>/assets/sfx/sfx-analysis.md`
- Exact SFX choice: Hyperframes may retime by ±0.1s to the implemented animation
- Audio files: copied into `composition/assets/music/` and `composition/assets/sfx/`

## Hyperframes Instructions
Domain skills loaded: hyperframes-core, hyperframes-animation, hyperframes-creative, hyperframes-keyframes, hyperframes-cli. /brag is its own workflow — no intent interview, no product-launch-video route.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (hero, proof strip, tiles, CTA all qualify).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer.
- Treat cue metadata as optional timing hints; readability first.
- Audio-reactive: wire the copper glows to the extracted bands; no waveform/equalizer visuals.
- Use local assets only (fonts, music, SFX, audio data). No network fetch at render time beyond the GSAP CDN script the scaffold already uses.
- Run `npx hyperframes check` before render — brag's single gate.
- Keep creation and rendering local.
