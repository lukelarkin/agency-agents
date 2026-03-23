/**
 * Data schemas and constants for The Player dating tracker.
 */

export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export const ZODIAC_ELEMENTS = {
  Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water',
  Leo: 'Fire', Virgo: 'Earth', Libra: 'Air', Scorpio: 'Water',
  Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water',
};

export const ZODIAC_COMPATIBILITY = {
  Fire: { Fire: 'high', Earth: 'low', Air: 'high', Water: 'medium' },
  Earth: { Fire: 'low', Earth: 'high', Air: 'medium', Water: 'high' },
  Air: { Fire: 'high', Earth: 'medium', Air: 'high', Water: 'low' },
  Water: { Fire: 'medium', Earth: 'high', Air: 'low', Water: 'high' },
};

export const ZODIAC_TRAITS = {
  Aries: { strengths: 'Bold, ambitious, direct', weaknesses: 'Impatient, moody, aggressive', attracted_to: 'Confidence, challenge, independence' },
  Taurus: { strengths: 'Reliable, patient, sensual', weaknesses: 'Stubborn, possessive, materialistic', attracted_to: 'Stability, physical touch, good food' },
  Gemini: { strengths: 'Witty, adaptable, curious', weaknesses: 'Inconsistent, superficial, restless', attracted_to: 'Intelligence, humor, variety' },
  Cancer: { strengths: 'Nurturing, intuitive, loyal', weaknesses: 'Clingy, moody, insecure', attracted_to: 'Emotional safety, family values, depth' },
  Leo: { strengths: 'Charismatic, generous, warm', weaknesses: 'Arrogant, dramatic, dominating', attracted_to: 'Admiration, loyalty, grand gestures' },
  Virgo: { strengths: 'Analytical, helpful, practical', weaknesses: 'Overcritical, perfectionist, anxious', attracted_to: 'Attention to detail, cleanliness, reliability' },
  Libra: { strengths: 'Charming, diplomatic, romantic', weaknesses: 'Indecisive, avoids conflict, people-pleasing', attracted_to: 'Beauty, romance, intellectual conversation' },
  Scorpio: { strengths: 'Intense, passionate, perceptive', weaknesses: 'Jealous, secretive, controlling', attracted_to: 'Depth, mystery, loyalty, raw honesty' },
  Sagittarius: { strengths: 'Adventurous, optimistic, honest', weaknesses: 'Tactless, commitment-phobic, reckless', attracted_to: 'Freedom, travel, philosophy, humor' },
  Capricorn: { strengths: 'Ambitious, disciplined, responsible', weaknesses: 'Cold, pessimistic, workaholic', attracted_to: 'Ambition, success, long-term planning' },
  Aquarius: { strengths: 'Independent, innovative, humanitarian', weaknesses: 'Detached, unpredictable, aloof', attracted_to: 'Uniqueness, intellectual depth, causes' },
  Pisces: { strengths: 'Empathetic, creative, romantic', weaknesses: 'Escapist, overly trusting, victim mentality', attracted_to: 'Emotional depth, creativity, spirituality' },
};

export const ATTACHMENT_STYLES = [
  { id: 'secure', label: 'Secure', description: 'Comfortable with intimacy and independence', emoji: '🟢' },
  { id: 'anxious', label: 'Anxious', description: 'Craves closeness, fears abandonment', emoji: '🟡' },
  { id: 'avoidant', label: 'Avoidant', description: 'Values independence, uncomfortable with closeness', emoji: '🔵' },
  { id: 'fearful', label: 'Fearful-Avoidant', description: 'Wants closeness but fears it', emoji: '🔴' },
];

export const BIRTH_CONTROL_TYPES = [
  'None', 'Pill', 'IUD (Hormonal)', 'IUD (Copper)', 'Implant',
  'Patch', 'Ring', 'Shot', 'Condoms Only', 'Natural/FAM', 'Other',
];

export const CYCLE_PHASES = [
  { id: 'menstrual', label: 'Menstrual', days: '1-5', mood: 'Reflective, low energy', color: '#e74c3c', emoji: '🌑' },
  { id: 'follicular', label: 'Follicular', days: '6-13', mood: 'Rising energy, open, social', color: '#f39c12', emoji: '🌒' },
  { id: 'ovulatory', label: 'Ovulatory', days: '14-16', mood: 'Peak confidence, attraction, communicative', color: '#2ecc71', emoji: '🌕' },
  { id: 'luteal', label: 'Luteal', days: '17-28', mood: 'Nesting, sensitive, needs comfort', color: '#9b59b6', emoji: '🌘' },
];

export const LOVE_LANGUAGES = [
  'Words of Affirmation',
  'Acts of Service',
  'Receiving Gifts',
  'Quality Time',
  'Physical Touch',
];

export const RELATIONSHIP_STAGES = [
  'Prospect', 'Talking', 'Dating', 'Exclusive', 'Complicated', 'On Hold', 'Archived',
];

export const INTEREST_CATEGORIES = [
  'Fitness', 'Music', 'Travel', 'Food/Cooking', 'Art', 'Reading',
  'Outdoors', 'Nightlife', 'Gaming', 'Fashion', 'Spirituality',
  'Career-Driven', 'Family-Oriented', 'Pets/Animals', 'Tech', 'Sports',
];

export const FAMILY_DYNAMICS = [
  'Close with family', 'Distant from family', 'Only child', 'Eldest sibling',
  'Middle child', 'Youngest sibling', 'Single parent household', 'Blended family',
  'Estranged from parents', 'Family-first culture', 'Independent early',
];

export const VALUES = [
  'Loyalty', 'Ambition', 'Honesty', 'Adventure', 'Stability', 'Freedom',
  'Spirituality', 'Creativity', 'Compassion', 'Independence', 'Tradition',
  'Growth', 'Humor', 'Intelligence', 'Wealth', 'Health',
];

export const CONTACT_TYPES = [
  { id: 'text_sent', label: 'You texted', icon: '→', points: 1 },
  { id: 'text_received', label: 'She texted', icon: '←', points: 0 },
  { id: 'call', label: 'Phone call', icon: '📞', points: 2 },
  { id: 'date', label: 'Went on date', icon: '📍', points: 5 },
  { id: 'hookup', label: 'Hooked up', icon: '🔥', points: 3 },
  { id: 'she_initiated', label: 'She initiated plans', icon: '⭐', points: 0 },
  { id: 'you_initiated', label: 'You initiated plans', icon: '🎯', points: 2 },
  { id: 'left_on_read', label: 'Left on read', icon: '👻', points: -1 },
  { id: 'ghosted', label: 'Got ghosted', icon: '💀', points: -2 },
];

/**
 * Progressive depth journal prompts.
 * Level 1: Game-focused (what they want to hear)
 * Level 2: Self-awareness (bridge)
 * Level 3: Depth (what they need)
 */
export const JOURNAL_PROMPTS = {
  after_date: [
    // Level 1 - Game
    { level: 1, prompt: 'What worked? What got the best reaction from her?', category: 'tactics' },
    { level: 1, prompt: 'Rate your confidence level tonight 1-10. What affected it?', category: 'self' },
    { level: 1, prompt: 'Did you lead or follow? How did she respond to it?', category: 'tactics' },
    // Level 2 - Bridge
    { level: 2, prompt: 'Was there a moment you felt genuinely curious about her? What triggered it?', category: 'awareness' },
    { level: 2, prompt: 'Did you catch yourself performing? When did you drop the act?', category: 'awareness' },
    { level: 2, prompt: 'What did you actually enjoy vs. what you think you should have enjoyed?', category: 'honesty' },
    // Level 3 - Depth
    { level: 3, prompt: 'If this was the last date you ever went on, would you feel satisfied? Why or why not?', category: 'depth' },
    { level: 3, prompt: 'What are you actually looking for underneath all of this?', category: 'depth' },
    { level: 3, prompt: 'She\'s a person with her own fears and dreams. Did you see her tonight, or just your idea of her?', category: 'depth' },
  ],
  after_ghosted: [
    { level: 1, prompt: 'Analyze what happened. Where did the energy shift?', category: 'tactics' },
    { level: 2, prompt: 'Does it sting? Sit with that for a second. Where in your body do you feel it?', category: 'awareness' },
    { level: 3, prompt: 'Is the sting about losing her, or losing the validation? Be honest.', category: 'depth' },
  ],
  after_hookup: [
    { level: 1, prompt: 'W. How are you feeling? Log the details that matter.', category: 'tactics' },
    { level: 2, prompt: 'Was there a moment of real connection, or was it purely physical?', category: 'awareness' },
    { level: 3, prompt: 'If she texted you right now saying she caught feelings — what\'s your gut reaction? That tells you everything.', category: 'depth' },
  ],
  weekly: [
    { level: 1, prompt: 'Scoreboard check: How many active conversations? Any going cold?', category: 'tactics' },
    { level: 2, prompt: 'Who are you most excited to see this week? Why her specifically?', category: 'awareness' },
    { level: 3, prompt: 'You\'re running game on multiple women. Is this making you happier than you were 3 months ago? Genuinely?', category: 'depth' },
    { level: 3, prompt: 'Picture yourself 5 years from now. Is this version of you still doing this? What does he actually want?', category: 'depth' },
  ],
  milestone: [
    { level: 2, prompt: 'You\'ve been using this app for a while now. What patterns do you see in who you choose?', category: 'awareness' },
    { level: 3, prompt: 'Every woman you\'ve archived — what do they have in common? What does that say about you?', category: 'depth' },
    { level: 3, prompt: 'The best moment you\'ve had with anyone on your roster — what made it different? Was it the game, or was it something else?', category: 'depth' },
  ],
};

/**
 * Situational text templates — context-aware, not just stage-aware.
 */
export const TEXT_SITUATIONS = {
  first_text_after_getting_number: [
    { text: 'Hey {name}, it\'s {userName}. Couldn\'t let that {interest} conversation die on the vine.', tone: 'confident-casual' },
    { text: '{name}. That was fun. Same time next week or are you gonna make me work for it?', tone: 'bold-playful' },
    { text: 'So {name}... you mentioned {detail}. I have thoughts. Coffee this week?', tone: 'curious-direct' },
  ],
  reviving_dead_conversation: [
    { text: 'I know it\'s been a minute. Saw {thing} and immediately thought of you.', tone: 'warm-no-pressure' },
    { text: 'Plot twist: I\'m texting you first this time. How\'s your week been?', tone: 'self-aware-playful' },
    { text: 'Hey stranger. I owe you a {activity}. You free this week?', tone: 'direct-accountable' },
  ],
  after_great_date: [
    { text: 'Home. Still smiling. That {moment} was everything.', tone: 'genuine' },
    { text: 'I don\'t usually say this, but I wasn\'t ready for tonight to end.', tone: 'vulnerable-confident' },
    { text: 'Verdict: you\'re trouble. When can I see you again?', tone: 'bold-playful' },
  ],
  after_mid_date: [
    { text: 'Good vibes tonight. Thanks for coming out, {name}.', tone: 'warm-noncommittal' },
    { text: 'That was nice. I\'m curious to see where this goes.', tone: 'honest-open' },
  ],
  she_went_cold: [
    { text: 'No pressure at all — just wanted to say I hope you\'re doing well.', tone: 'warm-zero-neediness' },
    { text: 'I get it, life gets crazy. Door\'s open if you want to grab that {activity}.', tone: 'abundant-casual' },
  ],
  escalating_to_date: [
    { text: 'Alright {name}, we\'ve been going back and forth enough. {day} evening. {activity}. You in?', tone: 'decisive-leading' },
    { text: 'I want to see you. Not over text. What does your week look like?', tone: 'direct-masculine' },
    { text: 'I have a spot in mind you\'d love. {day} work for you?', tone: 'planned-confident' },
  ],
  morning_texts: [
    { text: 'Good morning {name}. Hope today treats you right.', tone: 'warm-light' },
    { text: 'Woke up thinking about {memory}. You\'re something else.', tone: 'genuine-flirty' },
  ],
  goodnight_texts: [
    { text: 'Sleep well, {name}. Talk tomorrow.', tone: 'steady-consistent' },
    { text: 'Night. I\'m glad you exist.', tone: 'simple-deep' },
  ],
  she_shared_something_vulnerable: [
    { text: 'Thank you for telling me that. Seriously. That took guts.', tone: 'safe-masculine' },
    { text: 'I hear you. You don\'t have to carry that alone.', tone: 'present-grounded' },
    { text: 'That makes a lot of sense. I\'m not going anywhere.', tone: 'reassuring-stable' },
  ],
  after_argument: [
    { text: 'Hey. I\'ve been thinking about what you said. You had a point about {topic}.', tone: 'accountable' },
    { text: 'I don\'t want to be right. I want to be good with you. Can we talk?', tone: 'mature-vulnerable' },
  ],
};

// ── Platforms ──────────────────────────────────────────────────────

export const PLATFORMS = [
  { id: 'bumble', label: 'Bumble', icon: '🐝', type: 'dating' },
  { id: 'tinder', label: 'Tinder', icon: '🔥', type: 'dating' },
  { id: 'hinge', label: 'Hinge', icon: '🔗', type: 'dating' },
  { id: 'raya', label: 'Raya', icon: '⭐', type: 'dating' },
  { id: 'feeld', label: 'Feeld', icon: '🌀', type: 'dating' },
  { id: 'snapchat', label: 'Snapchat', icon: '👻', type: 'social' },
  { id: 'instagram', label: 'Instagram', icon: '📸', type: 'social' },
  { id: 'facebook', label: 'FB Messenger', icon: '💬', type: 'social' },
  { id: 'imessage', label: 'iMessage', icon: '💚', type: 'phone' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '📱', type: 'phone' },
  { id: 'phone', label: 'Phone/SMS', icon: '📞', type: 'phone' },
  { id: 'irl', label: 'In Person', icon: '👋', type: 'irl' },
];

/**
 * Creates a blank profile with defaults.
 */
export function createProfile(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    name: '',
    nickname: '',
    age: null,
    photo: null,
    zodiacSign: null,
    attachmentStyle: null,
    loveLanguages: [],
    birthControl: null,
    cycleLength: 28,
    lastPeriodStart: null,
    interests: [],
    values: [],
    familyDynamics: [],
    relationshipStage: 'Prospect',
    metOn: '',
    metDetails: '',
    activePlatforms: [], // which platforms you're currently talking on
    primaryPlatform: '', // the main one you text on right now
    notes: '',
    dateLog: [],
    contactLog: [],
    importantDetails: [], // her dog's name, fav drink, etc.
    messagePatterns: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Creates a date log entry.
 */
export function createDateEntry(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString().split('T')[0],
    location: '',
    activity: '',
    howItWent: 3,
    vibe: 3, // 1-5 how natural/forced the connection felt
    notes: '',
    nextMoveNote: '',
    ...overrides,
  };
}

/**
 * Creates a contact log entry.
 */
export function createContactLog(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    type: 'text_sent',
    platform: '', // which platform this interaction happened on
    timestamp: new Date().toISOString(),
    note: '',
    ...overrides,
  };
}

/**
 * Creates a journal entry.
 */
export function createJournalEntry(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    profileId: null,
    prompt: '',
    response: '',
    category: 'tactics',
    level: 1,
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

// ── Profile Grading ────────────────────────────────────────────────

export const PHOTO_CRITERIA = [
  { id: 'has_clear_face', label: 'Clear face visible (not blurry, not too far)', weight: 3, tip: 'Your first photo should be a clear headshot or upper body. Natural light, slight smile, looking at camera.' },
  { id: 'no_group_first', label: 'First photo is just you (no group)', weight: 3, tip: 'She swipes in 0.5 seconds. If she can\'t tell which one you are, she swipes left.' },
  { id: 'variety', label: 'Mix of settings (not all selfies, not all bar pics)', weight: 2, tip: 'Show range: one outdoor/active, one social, one dressed up, one candid. Tells a story of a full life.' },
  { id: 'shows_lifestyle', label: 'At least one photo shows you doing something', weight: 2, tip: 'Hiking, cooking, playing guitar, at an event — anything that\'s not posing. Shows you have a life.' },
  { id: 'good_lighting', label: 'Good lighting (no dark bathroom mirror selfies)', weight: 2, tip: 'Natural light > everything. Golden hour, near a window, outside. Bathroom fluorescent lighting is an instant L.' },
  { id: 'no_fish_car_gym', label: 'No dead fish, car selfie, or gym mirror pic', weight: 1, tip: 'These are the three horsemen of the dating app apocalypse. Remove immediately.' },
  { id: 'shows_height_build', label: 'Full body shot included', weight: 1, tip: 'Not hiding your body = confidence. Include one full-body photo even if you\'re not ripped.' },
  { id: 'recent', label: 'Photos are recent (within last year)', weight: 2, tip: 'If you look different from your photos, the date starts with disappointment. Keep it current.' },
  { id: 'pet_or_social_proof', label: 'Bonus: photo with a dog/friends/family', weight: 1, tip: 'Social proof signals you\'re not a loner. A dog is a cheat code. But don\'t force it.' },
];

export const BIO_CRITERIA = [
  { id: 'has_hook', label: 'Opens with something interesting (not "hey" or "just ask")', weight: 3, tip: 'First line = hook. "I make the best carbonara you\'ll ever have" > "Just a chill guy looking for my person"' },
  { id: 'shows_personality', label: 'Personality comes through (humor, energy, vibe)', weight: 3, tip: 'She should read your bio and feel like she already knows what you\'d be like to hang out with.' },
  { id: 'not_generic', label: 'Specific details, not generic claims', weight: 3, tip: '"I once drove 4 hours for the best tacos in New Mexico" > "I love food and travel." Specificity = believability.' },
  { id: 'no_negativity', label: 'No negative filters ("don\'t waste my time", "no drama")', weight: 2, tip: 'Negativity in a bio signals baggage. You\'re advertising a good time, not posting house rules.' },
  { id: 'right_length', label: 'Right length (not too short, not an essay)', weight: 2, tip: '2-4 lines is the sweet spot. Long enough to be interesting. Short enough to leave her curious.' },
  { id: 'has_cta', label: 'Ends with a conversation starter or easy in', weight: 2, tip: '"If you know the best Thai spot in town, we\'re already compatible" gives her something to message about.' },
  { id: 'no_height_list', label: 'Not a bullet point checklist of stats', weight: 1, tip: '"6\'1 / engineer / gym 5x / coffee addict" is a resume, not a personality. Show, don\'t list.' },
];

export const PROMPT_CRITERIA = [
  { id: 'shows_values', label: 'Reveals something real about who you are', weight: 3, tip: 'The prompt answer should make her think "I want to know more" not "I\'ve seen this 50 times today."' },
  { id: 'conversation_starter', label: 'Easy for her to respond to', weight: 3, tip: 'Great prompts invite a response. "My most controversial opinion: cereal is soup" starts a debate.' },
  { id: 'specific_not_vague', label: 'Specific and memorable', weight: 2, tip: '"A life goal of mine: open a vinyl cafe in Portugal" > "A life goal: be happy"' },
  { id: 'humor_or_depth', label: 'Either genuinely funny or genuinely deep', weight: 2, tip: 'Pick a lane per prompt. One funny, one sincere. Both land better than two mediocre attempts at both.' },
  { id: 'not_overused', label: 'Avoids cliché answers ("The Office", "tacos")', weight: 1, tip: 'If 10,000 other dudes would write the same answer, it doesn\'t differentiate you. Find your unique angle.' },
];

// ── Date Planning ──────────────────────────────────────────────────

export const DATE_TYPES = [
  { id: 'coffee', label: 'Coffee', effort: 1, cost: '$', time: 45, vibe: 'Low-key get-to-know-you', bestFor: ['Prospect', 'Talking'] },
  { id: 'walk', label: 'Walk/Park', effort: 1, cost: 'Free', time: 60, vibe: 'Casual, low pressure, easy exit if needed', bestFor: ['Prospect', 'Talking'] },
  { id: 'drinks', label: 'Drinks', effort: 2, cost: '$$', time: 90, vibe: 'Classic. Social lubricant. Easy to extend or cut short', bestFor: ['Prospect', 'Talking', 'Dating'] },
  { id: 'dinner', label: 'Dinner', effort: 3, cost: '$$$', time: 120, vibe: 'Investment date. Save for someone worth it', bestFor: ['Dating', 'Exclusive'] },
  { id: 'activity', label: 'Activity Date', effort: 3, cost: '$$', time: 120, vibe: 'Bowling, mini golf, cooking class. Shared experience > staring across a table', bestFor: ['Talking', 'Dating'] },
  { id: 'adventure', label: 'Adventure', effort: 4, cost: '$$', time: 180, vibe: 'Hike, beach day, road trip to somewhere. High reward if she\'s the right one', bestFor: ['Dating', 'Exclusive'] },
  { id: 'home', label: 'Night In', effort: 2, cost: '$', time: 180, vibe: 'Cook together, movie, intimate. Only when comfort level is there', bestFor: ['Dating', 'Exclusive'] },
  { id: 'event', label: 'Event/Show', effort: 3, cost: '$$$', time: 180, vibe: 'Concert, comedy show, art gallery. Built-in conversation material', bestFor: ['Talking', 'Dating', 'Exclusive'] },
];

export const BUDGET_TIERS = [
  { id: 'broke', label: 'Keeping it tight', monthly: 100, perDate: 15, strategy: 'Coffee dates, free events, parks, home cooking. Creativity > spending.' },
  { id: 'comfortable', label: 'Comfortable', monthly: 300, perDate: 40, strategy: 'Mix of drinks/coffee for new matches, nicer spots for the ones that matter.' },
  { id: 'flush', label: 'Money\'s not the issue', monthly: 600, perDate: 80, strategy: 'You can afford experiences. But don\'t lead with money — it attracts the wrong ones.' },
];

// ── Voice/Writing Style ────────────────────────────────────────────

export const VOICE_TRAITS = [
  'Uses humor/sarcasm', 'Direct and to the point', 'Emoji heavy', 'No emojis',
  'Uses slang/casual', 'Proper grammar', 'Short sentences', 'Longer/expressive',
  'Flirty by default', 'More reserved', 'Uses nicknames (babe, love)',
  'Asks a lot of questions', 'Makes statements', 'Self-deprecating humor',
];
