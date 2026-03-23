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
