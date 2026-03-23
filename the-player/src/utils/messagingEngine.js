/**
 * Messaging and communication pattern engine.
 * Generates text suggestions based on attachment style, cycle phase,
 * relationship stage, and love languages.
 */

const OPENERS = {
  Prospect: [
    'Hey {name}, I saw something that reminded me of you — ',
    'So {name}... I have a question for you.',
    'Been thinking about what you said about {interest}.',
  ],
  Talking: [
    'Good morning {name} ☀️',
    'I had a great time the other day. When are we doing that again?',
    'You won\'t believe what just happened...',
  ],
  Dating: [
    'Missing you today, {name}.',
    'I just passed {location} and thought of you.',
    'Hey beautiful, what\'s your week looking like?',
  ],
  Exclusive: [
    'Can\'t stop thinking about last night.',
    'You make my days better, you know that?',
    'I have plans for us this weekend...',
  ],
};

const ATTACHMENT_MODIFIERS = {
  secure: {
    tone: 'direct and warm',
    tips: [
      'Be straightforward — she can handle it.',
      'Match her energy. Mirror and escalate naturally.',
    ],
    avoid: 'Nothing major — stay genuine.',
  },
  anxious: {
    tone: 'reassuring and consistent',
    tips: [
      'Reply within a reasonable time — long gaps spike anxiety.',
      'Be explicit about plans. "I\'ll text you tomorrow" > silence.',
      'Small affirmations go a long way: "I really enjoy talking to you."',
    ],
    avoid: 'Don\'t go cold or play hard to get. It backfires.',
  },
  avoidant: {
    tone: 'light and low-pressure',
    tips: [
      'Give her space. Don\'t double-text.',
      'Keep it casual and fun — avoid heavy emotional topics early.',
      'Let her come to you sometimes. Pull back slightly after initiating.',
    ],
    avoid: 'Don\'t overwhelm with affection or demand immediate responses.',
  },
  fearful: {
    tone: 'patient and steady',
    tips: [
      'Be consistent but not overbearing.',
      'Acknowledge her feelings without pushing.',
      'Build trust through small reliable actions over time.',
    ],
    avoid: 'Don\'t push for vulnerability too fast or withdraw suddenly.',
  },
};

const LOVE_LANGUAGE_TEXTS = {
  'Words of Affirmation': [
    'I really admire how {trait} you are.',
    'You looked amazing the other day.',
    'I appreciate you, {name}.',
  ],
  'Acts of Service': [
    'Let me handle {task} for you.',
    'I made reservations at that place you mentioned.',
    'I got you something for {thing} — don\'t worry about it.',
  ],
  'Receiving Gifts': [
    'I found something that screamed your name.',
    'I have a little surprise for you next time we meet.',
    'Saw this and thought of you immediately.',
  ],
  'Quality Time': [
    'I blocked out my whole evening for us.',
    'No phones tonight — just you and me.',
    'I want to try that {activity} place with you this weekend.',
  ],
  'Physical Touch': [
    'I can\'t wait to see you... and hold you.',
    'You give the best hugs, you know that?',
    'Come closer.',
  ],
};

const PHASE_TEXT_STYLE = {
  menstrual: 'Keep texts warm, short, and comforting. No big asks.',
  follicular: 'Be upbeat, suggest plans, light flirting works.',
  ovulatory: 'Be bold, direct, and playful. She\'s most receptive now.',
  luteal: 'Empathetic tone. Check in on her. Be a steady presence.',
};

/**
 * Generate text message suggestions for a given profile context.
 */
export function generateTextSuggestions({ name, stage, attachmentStyle, loveLanguages, interests, cyclePhase }) {
  const suggestions = [];

  // Stage-appropriate openers
  const stageOpeners = OPENERS[stage] || OPENERS.Talking;
  stageOpeners.forEach(t => {
    suggestions.push({
      text: t.replace('{name}', name || 'her')
             .replace('{interest}', interests?.[0] || 'that thing')
             .replace('{location}', 'that spot'),
      category: 'opener',
    });
  });

  // Love language texts
  if (loveLanguages?.length) {
    loveLanguages.forEach(ll => {
      const templates = LOVE_LANGUAGE_TEXTS[ll] || [];
      templates.forEach(t => {
        suggestions.push({
          text: t.replace('{name}', name || 'babe')
                 .replace('{trait}', 'driven')
                 .replace('{task}', 'dinner tonight')
                 .replace('{thing}', 'your week')
                 .replace('{activity}', interests?.[0] || 'new'),
          category: 'love-language',
        });
      });
    });
  }

  return suggestions;
}

/**
 * Get communication playbook for a profile.
 */
export function getCommunicationPlaybook({ attachmentStyle, cyclePhase, stage }) {
  const attachment = ATTACHMENT_MODIFIERS[attachmentStyle] || ATTACHMENT_MODIFIERS.secure;
  const phaseStyle = PHASE_TEXT_STYLE[cyclePhase?.id] || PHASE_TEXT_STYLE.follicular;

  return {
    tone: attachment.tone,
    tips: attachment.tips,
    avoid: attachment.avoid,
    phaseGuidance: phaseStyle,
    responseTimeAdvice: attachmentStyle === 'anxious'
      ? 'Reply within 1-2 hours max. Consistency builds trust.'
      : attachmentStyle === 'avoidant'
        ? 'Don\'t reply instantly every time. Give breathing room.'
        : 'Match her response cadence. Stay natural.',
  };
}
