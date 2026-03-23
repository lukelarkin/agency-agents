/**
 * Her Profile Scanner
 * Analyzes her dating profile to generate:
 * - Photo vibe assessment (thirst traps vs wholesome vs chaos)
 * - Red/green flag detection from bio text
 * - Chaos rating (1-10)
 * - Communication strategy based on her profile energy
 * - What she's ACTUALLY saying vs what her profile is CONVEYING
 */

export const PHOTO_VIBES = [
  { id: 'wholesome', label: 'Wholesome', emoji: '🌸', description: 'Smiling in nature, with family, casual/genuine photos', strategy: 'She wants to be seen as relationship material. Lead with substance, not just looks. Ask about her interests.' },
  { id: 'high_effort', label: 'High Effort Glam', emoji: '💅', description: 'Professional looking, done up, Instagram-quality', strategy: 'She puts effort into her appearance and expects effort from you. Don\'t show up looking like you just rolled out of bed. Plan proper dates.' },
  { id: 'thirst_trap', label: 'Thirst Trap Energy', emoji: '🔥', description: 'Bikini shots, provocative poses, heavy filters', strategy: 'She knows what she\'s doing. Don\'t be the 50th guy who opens with "wow you\'re so hot." Stand out by being the one who notices something ELSE about her.' },
  { id: 'adventurous', label: 'Adventure Girl', emoji: '🏔️', description: 'Travel, hiking, festivals, action shots', strategy: 'She values experiences over things. Suggest active dates. Ask about her trips. Don\'t suggest "Netflix and chill" to this one.' },
  { id: 'artsy', label: 'Artsy/Alternative', emoji: '🎨', description: 'Creative, unique style, museum vibes', strategy: 'Intellectual conversation wins here. Reference something specific from her profile. Don\'t be generic — she\'ll see through it instantly.' },
  { id: 'party_girl', label: 'Party Girl', emoji: '🍾', description: 'Club pics, drinking, group party shots', strategy: 'Fun but assess if you\'re looking for the same thing. She might be looking for a good time, not a long time. Match energy or move on.' },
  { id: 'mom_energy', label: 'Mom Energy', emoji: '👶', description: 'Kids in photos, family-oriented, nurturing vibe', strategy: 'She\'s serious. Her time is limited and valuable. Be direct about your intentions. Don\'t waste her time if you\'re not ready for that.' },
  { id: 'mysterious', label: 'Mysterious/Minimal', emoji: '🌙', description: 'Few photos, face partially hidden, dark aesthetic', strategy: 'She\'s guarded. Could be avoidant attachment. Move slow, ask open-ended questions, don\'t push for too much too fast.' },
];

export const RED_FLAGS = [
  { pattern: /\b(drama|toxic|crazy ex)\b/i, flag: 'Mentions drama/toxicity', severity: 'medium', note: 'People who talk about drama usually bring it. Proceed with eyes open.' },
  { pattern: /\b(venmo|cashapp|cash app|send me|buy me)\b/i, flag: 'Money solicitation', severity: 'high', note: 'She\'s not looking for a date. She\'s looking for a wallet. Hard pass.' },
  { pattern: /\b(my kids? come first|single mom|mama bear)\b/i, flag: 'Single parent', severity: 'info', note: 'Not a red flag — just important context. Her schedule is limited and her standards are higher. Respect that.' },
  { pattern: /\b(6'|6 foot|6ft|tall guys? only)\b/i, flag: 'Height requirement', severity: 'low', note: 'She has a physical preference. It\'s honest at least. If you meet it, great. If not, don\'t take it personally.' },
  { pattern: /\b(no hookups?|looking for something real|serious only)\b/i, flag: 'Wants commitment', severity: 'info', note: 'She\'s filtering. If you\'re not looking for the same thing, be honest or move on. Don\'t waste her time.' },
  { pattern: /\b(just here for fun|not looking for anything serious|no strings)\b/i, flag: 'Casual only', severity: 'info', note: 'She\'s telling you what this is. Listen. Don\'t try to "change her mind."' },
  { pattern: /\b(don't know what i'm looking for|figure it out|see where it goes)\b/i, flag: 'Unsure/avoidant', severity: 'low', note: 'She either doesn\'t know or doesn\'t want to commit to an answer. Could mean avoidant attachment.' },
  { pattern: /\b(my ex|ex boyfriend|ex husband|recently single|just got out of)\b/i, flag: 'Recently out of relationship', severity: 'medium', note: 'She might be on the rebound. Could go either way — just know what you\'re walking into.' },
  { pattern: /\b(entrepreneur|boss babe|ceo|investor)\b/i, flag: 'Career-focused', severity: 'info', note: 'Ambitious. She might have limited availability but high standards. Bring your A-game.' },
  { pattern: /\b(fluent in sarcasm|speak my love language|swipe left if)\b/i, flag: 'Cliché bio', severity: 'low', note: 'She didn\'t put much thought into her profile. Doesn\'t mean she\'s not cool, but she\'s not trying hard to stand out either.' },
  { pattern: /\b(ig:|insta:|follow me|snap:|sc:)\b/i, flag: 'Social media redirect', severity: 'medium', note: 'She might be farming followers, not looking for dates. Test by asking her out — if she deflects to socials, move on.' },
];

export const GREEN_FLAGS = [
  { pattern: /\b(love to cook|cooking|baking)\b/i, flag: 'Cooks/bakes', note: 'Nurturing energy. Suggest a cooking date — instant chemistry builder.' },
  { pattern: /\b(hiking|outdoors|camping|climbing)\b/i, flag: 'Outdoorsy', note: 'Active and low-maintenance. Great sign for adventurous dates.' },
  { pattern: /\b(read|books?|currently reading)\b/i, flag: 'Reader', note: 'Intellectual. Ask what she\'s reading — instant deep conversation.' },
  { pattern: /\b(close with.*family|family means|family oriented)\b/i, flag: 'Family-oriented', note: 'She values deep connections. If you\'re serious, mention yours too.' },
  { pattern: /\b(therapy|self.?work|growth|healing)\b/i, flag: 'Self-aware', note: 'She\'s doing the inner work. Huge green flag. Match her emotional maturity.' },
  { pattern: /\b(volunteer|give back|non.?profit|community)\b/i, flag: 'Gives back', note: 'She cares about more than herself. Values-driven. High-quality human alert.' },
];

/**
 * Scan her profile text for flags and generate insights.
 * @param {string} bioText - Her bio/about me text
 * @param {Array<string>} promptAnswers - Her prompt responses
 * @returns {Object} Scan results
 */
export function scanHerProfile(bioText = '', promptAnswers = []) {
  const allText = [bioText, ...promptAnswers].join(' ');
  const redFlags = [];
  const greenFlags = [];

  for (const rf of RED_FLAGS) {
    if (rf.pattern.test(allText)) {
      redFlags.push({ flag: rf.flag, severity: rf.severity, note: rf.note });
    }
  }

  for (const gf of GREEN_FLAGS) {
    if (gf.pattern.test(allText)) {
      greenFlags.push({ flag: gf.flag, note: gf.note });
    }
  }

  // Word count analysis
  const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;
  const effortLevel = wordCount > 80 ? 'high' : wordCount > 30 ? 'medium' : wordCount > 10 ? 'low' : 'minimal';

  return {
    redFlags,
    greenFlags,
    effortLevel,
    wordCount,
  };
}

/**
 * Calculate chaos rating (1-10) based on profile signals.
 * @param {Object} profileData - { age, kids, redFlags, photoVibe, bioFlags }
 * @returns {Object} { rating, level, assessment, advice }
 */
export function getChaosRating(profileData) {
  let chaos = 3; // Baseline

  // Red flag accumulation
  const highFlags = (profileData.redFlags || []).filter(f => f.severity === 'high').length;
  const medFlags = (profileData.redFlags || []).filter(f => f.severity === 'medium').length;
  chaos += highFlags * 2;
  chaos += medFlags * 1;

  // Photo vibe
  if (profileData.photoVibe === 'party_girl') chaos += 1.5;
  if (profileData.photoVibe === 'thirst_trap') chaos += 1;
  if (profileData.photoVibe === 'mysterious') chaos += 0.5;

  // Life situation signals
  if (profileData.hasKids && profileData.age && profileData.age < 25) chaos += 2;
  if (profileData.hasKids && profileData.kidCount >= 3) chaos += 1.5;
  if (profileData.recentlyDivorced) chaos += 1;
  if (profileData.mentionsDrama) chaos += 1.5;
  if (profileData.socialMediaRedirect) chaos += 1;

  // Green flags reduce chaos
  const greenCount = (profileData.greenFlags || []).length;
  chaos -= greenCount * 0.5;

  // Effort level
  if (profileData.effortLevel === 'high') chaos -= 0.5;
  if (profileData.effortLevel === 'minimal') chaos += 0.5;

  // Clamp
  chaos = Math.max(1, Math.min(10, Math.round(chaos * 10) / 10));

  let level, assessment, advice;

  if (chaos <= 2) {
    level = 'Green';
    assessment = 'She seems stable and intentional. Low risk.';
    advice = 'Invest. She\'s presenting as someone worth your time.';
  } else if (chaos <= 4) {
    level = 'Yellow-Green';
    assessment = 'Mostly solid. A couple things to watch but nothing alarming.';
    advice = 'Proceed normally. Keep your eyes open on the first date.';
  } else if (chaos <= 6) {
    level = 'Yellow';
    assessment = 'Mixed signals. Some things don\'t add up. Could go either way.';
    advice = 'Low-investment first date (coffee, walk). Don\'t overcommit until you see who she really is.';
  } else if (chaos <= 8) {
    level = 'Orange';
    assessment = 'Multiple warning signs. Your gut is probably already telling you something.';
    advice = 'Proceed with extreme caution. Public place only. Don\'t invest emotionally or financially until you know more.';
  } else {
    level = 'Red';
    assessment = 'High chaos probability. The flags are waving and you need to see them.';
    advice = 'Seriously consider passing. If you proceed, coffee only, public place, tell a friend where you\'re going. And wrap it up.';
  }

  return { rating: chaos, level, assessment, advice };
}

/**
 * Generate communication strategy based on her profile analysis.
 */
export function getHerCommunicationStrategy(photoVibe, scanResults, chaosRating) {
  const vibeInfo = PHOTO_VIBES.find(v => v.id === photoVibe);
  const strategy = {
    photoStrategy: vibeInfo?.strategy || 'Standard approach — be genuine and specific.',
    openingAngle: getOpeningAngle(photoVibe, scanResults),
    toneSuggestion: getToneSuggestion(photoVibe, chaosRating),
    whatSheWants: getWhatSheWants(photoVibe, scanResults),
    investmentLevel: chaosRating.rating <= 4 ? 'Invest' : chaosRating.rating <= 6 ? 'Moderate' : 'Minimal until proven',
  };

  return strategy;
}

function getOpeningAngle(vibe, scan) {
  if (scan.greenFlags.some(f => f.flag.includes('Reader'))) return 'Ask what she\'s reading. Instant intellectual connection.';
  if (scan.greenFlags.some(f => f.flag.includes('Cook'))) return 'Challenge her: "What\'s your signature dish?" Playful and specific.';
  if (scan.greenFlags.some(f => f.flag.includes('Outdoorsy'))) return 'Reference a specific trail or outdoor spot. Shows shared interest.';

  switch (vibe) {
    case 'wholesome': return 'Genuine compliment about something specific (not her looks). Ask about her interests.';
    case 'thirst_trap': return 'Don\'t comment on her body. Notice something else — her travel pics, her humor, her style. Stand out.';
    case 'artsy': return 'Reference something cultural or creative. Show you have depth.';
    case 'adventurous': return 'Share a quick adventure story or ask about her craziest trip.';
    case 'high_effort': return 'Compliment her energy or style, not just appearance. Suggest a proper date spot.';
    case 'party_girl': return 'Match her fun energy. Suggest something social. Don\'t try to be deep right away.';
    case 'mom_energy': return 'Be respectful and direct. Show you understand her time is valuable.';
    case 'mysterious': return 'Ask an open-ended, interesting question. Don\'t force her to open up.';
    default: return 'Be specific about something in her profile. Specificity shows you actually looked.';
  }
}

function getToneSuggestion(vibe, chaos) {
  if (chaos.rating > 6) return 'Keep it light and casual. Don\'t invest emotionally over text. Get to a public date fast to assess in person.';
  switch (vibe) {
    case 'wholesome': return 'Warm, genuine, steady. Show you\'re safe without being boring.';
    case 'thirst_trap': return 'Confident but not thirsty. Humor works. Don\'t simp.';
    case 'artsy': return 'Thoughtful, slightly witty. Don\'t try too hard to be intellectual.';
    case 'adventurous': return 'Energetic, playful, spontaneous. Suggest doing something, not just talking.';
    default: return 'Be yourself but calibrated. Match her energy level.';
  }
}

function getWhatSheWants(vibe, scan) {
  const wants = [];
  if (scan.redFlags.some(f => f.flag.includes('commitment'))) wants.push('She explicitly wants something serious. Don\'t pretend you do if you don\'t.');
  if (scan.redFlags.some(f => f.flag.includes('Casual only'))) wants.push('She\'s told you what this is. Believe her.');
  if (scan.greenFlags.some(f => f.flag.includes('Self-aware'))) wants.push('She\'s done the inner work and expects emotional maturity.');

  switch (vibe) {
    case 'wholesome': wants.push('Likely wants genuine connection and consistency.'); break;
    case 'thirst_trap': wants.push('Might want validation, might want attraction — figure out which on the date.'); break;
    case 'high_effort': wants.push('She wants to be matched in effort. Show up polished.'); break;
    case 'adventurous': wants.push('She wants someone who can keep up. Don\'t be boring.'); break;
    case 'mom_energy': wants.push('She wants stability and someone who respects her reality.'); break;
  }

  return wants.length > 0 ? wants : ['Read between the lines. Her profile tells you what she values — pay attention to what she shows, not just what she says.'];
}
