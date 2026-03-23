/**
 * Voice Learning System
 * Learns the user's texting style from samples and generates texts that sound like them.
 * No AI API calls — uses pattern extraction and template synthesis.
 */

/**
 * Analyze text samples to extract writing style patterns.
 * @param {Array<string>} samples - Array of text messages the user has written
 * @returns {Object} Voice profile
 */
export function analyzeVoice(samples) {
  if (!samples || samples.length === 0) {
    return getDefaultVoice();
  }

  const allText = samples.join(' ');
  const words = allText.split(/\s+/).filter(Boolean);
  const sentences = samples;

  // Length patterns
  const avgLength = Math.round(words.length / samples.length);
  const lengthStyle = avgLength <= 5 ? 'terse' : avgLength <= 12 ? 'concise' : avgLength <= 25 ? 'conversational' : 'expressive';

  // Emoji usage
  const emojiCount = (allText.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) || []).length;
  const emojiRate = emojiCount / samples.length;
  const emojiStyle = emojiRate > 1.5 ? 'emoji-heavy' : emojiRate > 0.3 ? 'some-emoji' : 'no-emoji';

  // Punctuation style
  const exclamations = (allText.match(/!/g) || []).length;
  const questions = (allText.match(/\?/g) || []).length;
  const ellipses = (allText.match(/\.\.\./g) || []).length;
  const periods = (allText.match(/\.(?!\.)/g) || []).length;

  const punctStyle = exclamations > questions * 2 ? 'enthusiastic' :
                     questions > exclamations ? 'inquisitive' :
                     ellipses > 2 ? 'trailing' :
                     periods < samples.length * 0.3 ? 'no-punctuation' : 'standard';

  // Capitalization
  const lowerStarts = samples.filter(s => s[0] === s[0]?.toLowerCase() && /[a-z]/.test(s[0] || '')).length;
  const capsStyle = lowerStarts > samples.length * 0.6 ? 'lowercase' : 'normal-caps';

  // Casual markers
  const slang = (allText.match(/\b(lol|lmao|haha|bruh|nah|ya|gonna|wanna|ain't|tbh|fr|imo|ngl|lowkey|highkey|vibe|bet|deadass|sus|cap|no cap)\b/gi) || []).length;
  const formalityLevel = slang > samples.length * 0.3 ? 'very-casual' : slang > 0 ? 'casual' : 'standard';

  // Common openers
  const openerPatterns = [];
  for (const s of samples) {
    const firstWord = s.split(/\s/)[0]?.toLowerCase();
    if (firstWord) openerPatterns.push(firstWord);
  }
  const topOpeners = getTopN(openerPatterns, 3);

  // Signature phrases (2-3 word combos that appear multiple times)
  const signaturePhrases = extractSignatures(samples);

  // Nicknames usage
  const nicknamePatterns = (allText.match(/\b(babe|baby|love|boo|beautiful|gorgeous|sweetie|honey|queen|mama|cutie|girl)\b/gi) || []);
  const usesNicknames = nicknamePatterns.length > 0;
  const favoriteNickname = usesNicknames ? getTopN(nicknamePatterns.map(n => n.toLowerCase()), 1)[0] : null;

  // Question tendency
  const questionRate = questions / samples.length;
  const asksQuestions = questionRate > 0.3;

  return {
    lengthStyle,
    avgLength,
    emojiStyle,
    emojiRate: Math.round(emojiRate * 10) / 10,
    punctStyle,
    capsStyle,
    formalityLevel,
    topOpeners,
    signaturePhrases,
    usesNicknames,
    favoriteNickname,
    asksQuestions,
    sampleCount: samples.length,
    // Raw metrics for display
    metrics: {
      avgWordsPerMessage: avgLength,
      emojiPerMessage: Math.round(emojiRate * 10) / 10,
      exclamationRate: Math.round((exclamations / samples.length) * 10) / 10,
      questionRate: Math.round(questionRate * 10) / 10,
      slangRate: Math.round((slang / samples.length) * 10) / 10,
    },
  };
}

function getDefaultVoice() {
  return {
    lengthStyle: 'concise',
    avgLength: 8,
    emojiStyle: 'some-emoji',
    emojiRate: 0.5,
    punctStyle: 'standard',
    capsStyle: 'normal-caps',
    formalityLevel: 'casual',
    topOpeners: ['hey', 'yo', 'what'],
    signaturePhrases: [],
    usesNicknames: false,
    favoriteNickname: null,
    asksQuestions: true,
    sampleCount: 0,
    metrics: {},
  };
}

function getTopN(arr, n) {
  const counts = {};
  arr.forEach(item => { counts[item] = (counts[item] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n).map(e => e[0]);
}

function extractSignatures(samples) {
  const bigrams = {};
  for (const s of samples) {
    const words = s.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    for (let i = 0; i < words.length - 1; i++) {
      const pair = `${words[i]} ${words[i + 1]}`;
      bigrams[pair] = (bigrams[pair] || 0) + 1;
    }
  }
  return Object.entries(bigrams)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([phrase]) => phrase);
}

/**
 * Transform a text template to match the user's voice.
 * @param {string} text - The template text
 * @param {Object} voice - The voice profile from analyzeVoice()
 * @param {string} herName - Her name for personalization
 * @returns {string} Transformed text
 */
export function transformToVoice(text, voice, herName = '') {
  if (!voice || voice.sampleCount === 0) return text;

  let result = text;

  // Capitalization
  if (voice.capsStyle === 'lowercase') {
    result = result.charAt(0).toLowerCase() + result.slice(1);
  }

  // Emoji style
  if (voice.emojiStyle === 'no-emoji') {
    result = result.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();
  } else if (voice.emojiStyle === 'emoji-heavy' && !result.match(/[\u{1F300}-\u{1FAFF}]/u)) {
    // Add a casual emoji at the end
    const emojis = ['😏', '🔥', '😂', '💯', '✨'];
    result += ' ' + emojis[Math.floor(Math.random() * emojis.length)];
  }

  // Punctuation style
  if (voice.punctStyle === 'no-punctuation') {
    result = result.replace(/[.!]$/, '');
  } else if (voice.punctStyle === 'enthusiastic' && result.endsWith('.')) {
    result = result.slice(0, -1) + '!';
  }

  // Nickname injection
  if (voice.usesNicknames && voice.favoriteNickname && herName) {
    // Sometimes replace the name with their preferred nickname
    if (Math.random() > 0.5) {
      result = result.replace(new RegExp(herName, 'g'), voice.favoriteNickname);
    }
  }

  // Length adjustment
  if (voice.lengthStyle === 'terse' && result.split(/\s+/).length > 10) {
    // Try to shorten: remove filler phrases
    result = result
      .replace(/\bI think\b/gi, '')
      .replace(/\breally\b/gi, '')
      .replace(/\bjust\b/gi, '')
      .replace(/\bactually\b/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // Formality
  if (voice.formalityLevel === 'very-casual') {
    result = result
      .replace(/\bgoing to\b/gi, 'gonna')
      .replace(/\bwant to\b/gi, 'wanna')
      .replace(/\bYou are\b/gi, "You're")
      .replace(/\bI am\b/gi, "I'm");
  }

  return result;
}

/**
 * Get a human-readable description of the voice profile.
 */
export function describeVoice(voice) {
  if (!voice || voice.sampleCount === 0) {
    return 'No writing samples yet. Add some of your actual texts to teach the app how you talk.';
  }

  const parts = [];
  parts.push(`You write ${voice.lengthStyle} messages (~${voice.avgLength} words)`);

  if (voice.emojiStyle === 'emoji-heavy') parts.push('you use a lot of emojis');
  else if (voice.emojiStyle === 'no-emoji') parts.push('you skip emojis');

  if (voice.capsStyle === 'lowercase') parts.push('you don\'t capitalize');
  if (voice.formalityLevel === 'very-casual') parts.push('your tone is super casual');
  if (voice.punctStyle === 'enthusiastic') parts.push('you\'re big on exclamation marks');
  if (voice.punctStyle === 'trailing') parts.push('you trail off with "..."');
  if (voice.asksQuestions) parts.push('you ask a lot of questions');
  if (voice.usesNicknames) parts.push(`you call her "${voice.favoriteNickname}"`);

  if (voice.signaturePhrases.length > 0) {
    parts.push(`your go-to phrases: "${voice.signaturePhrases.slice(0, 2).join('", "')}"`);
  }

  return parts.join('. ') + '.';
}
