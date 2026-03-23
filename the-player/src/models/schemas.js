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

export const ATTACHMENT_STYLES = [
  { id: 'secure', label: 'Secure', description: 'Comfortable with intimacy and independence' },
  { id: 'anxious', label: 'Anxious-Preoccupied', description: 'Craves closeness, fears abandonment' },
  { id: 'avoidant', label: 'Dismissive-Avoidant', description: 'Values independence, uncomfortable with closeness' },
  { id: 'fearful', label: 'Fearful-Avoidant', description: 'Wants closeness but fears it' },
];

export const BIRTH_CONTROL_TYPES = [
  'None', 'Pill', 'IUD (Hormonal)', 'IUD (Copper)', 'Implant',
  'Patch', 'Ring', 'Shot', 'Condoms Only', 'Natural/FAM', 'Other',
];

export const CYCLE_PHASES = [
  { id: 'menstrual', label: 'Menstrual', days: '1-5', mood: 'Reflective, low energy', color: '#e74c3c' },
  { id: 'follicular', label: 'Follicular', days: '6-13', mood: 'Rising energy, open, social', color: '#f39c12' },
  { id: 'ovulatory', label: 'Ovulatory', days: '14-16', mood: 'Peak confidence, attraction, communicative', color: '#2ecc71' },
  { id: 'luteal', label: 'Luteal', days: '17-28', mood: 'Nesting, sensitive, needs comfort', color: '#9b59b6' },
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
    notes: '',
    dateLog: [],
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
    howItWent: 3, // 1-5 scale
    notes: '',
    nextMoveNote: '',
    ...overrides,
  };
}
