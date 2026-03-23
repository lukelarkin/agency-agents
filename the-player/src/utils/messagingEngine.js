/**
 * Messaging and communication pattern engine.
 * Context-aware text generation based on:
 * - Relationship stage + attachment style + cycle phase
 * - Contact history (whose turn, how long since last contact)
 * - Situational context (after date, going cold, etc.)
 * - Love languages + personal details
 */

import { TEXT_SITUATIONS, CONTACT_TYPES } from '../models/schemas.js';

// ── Attachment Communication Matrix ──────────────────────────────────

const ATTACHMENT_PLAYBOOKS = {
  secure: {
    tone: 'Direct and warm',
    responseTime: 'Match her pace naturally. No games needed.',
    principles: [
      'Be straightforward — she can handle it and she\'ll respect it.',
      'Express interest without performing. Confidence isn\'t a show.',
      'When she pulls back, don\'t chase or punish. Hold steady.',
      'She\'ll match your energy. Give genuine energy.',
    ],
    redFlags: 'If she\'s secure and you\'re playing games, she\'ll lose interest fast. Secure women don\'t chase.',
    avoid: 'Don\'t play hard to get. Don\'t test her. She\'ll see through it.',
    escalation: 'Direct ask. "I want to take you out. Thursday work?"',
  },
  anxious: {
    tone: 'Reassuring and consistent',
    responseTime: 'Reply within 1-2 hours. Consistency is her love language even if she doesn\'t know it.',
    principles: [
      'Be explicit about your intentions. "I\'m taking you to dinner Friday" > "We should hang sometime."',
      'Don\'t go cold. Even a short text keeps the anxiety quiet.',
      'Affirm her specifically: "That thing you said about X was really smart" lands harder than "You\'re great."',
      'If you need space, TELL HER. Silence reads as rejection to her.',
    ],
    redFlags: 'If she\'s blowing up your phone or getting jealous early — that\'s anxiety, not craziness. Your consistency will either calm it or you\'ll see it can\'t be calmed.',
    avoid: 'Breadcrumbing. Mixed signals. Hot-and-cold. It doesn\'t create attraction — it creates trauma responses that feel like attraction.',
    escalation: 'Make concrete plans with specifics. Place, time, "I\'ll pick you up."',
  },
  avoidant: {
    tone: 'Light and spacious',
    responseTime: 'Don\'t reply instantly every time. Give breathing room. 3-6 hours is fine.',
    principles: [
      'Keep it light early on. Heavy emotional topics trigger her walls.',
      'Let her come to you. After you initiate once, wait for reciprocation.',
      'Independence is attractive to her. Have your own life loudly.',
      'When she opens up, don\'t pounce on it. Receive it calmly.',
    ],
    redFlags: 'If she keeps canceling but still texts — she\'s interested but terrified of closeness. Patience or move on.',
    avoid: 'Double texting. "Where are you?" energy. Demanding labels or DTR talks early. Trying to fix her walls.',
    escalation: 'Suggest low-stakes hangouts. "I\'m going to X, you should come." Not "I need to see you."',
  },
  fearful: {
    tone: 'Patient and steady',
    responseTime: 'Be consistent but not overwhelming. Reliable rhythm over intensity.',
    principles: [
      'She wants closeness AND is terrified of it. Don\'t take the push-pull personally.',
      'Be the calm in her storm. Don\'t match her chaos with chaos.',
      'Trust is built in small moments: following through on small promises.',
      'Let her set the physical pace. Don\'t rush intimacy.',
    ],
    redFlags: 'Hot-and-cold cycles are her default. If you can\'t handle that, be honest with yourself.',
    avoid: 'Sudden moves. Surprising her with intensity. Demanding consistency she can\'t give yet. Withdrawing as punishment.',
    escalation: 'Build routines first. "Want to make Tuesday our thing?" Predictability = safety for her.',
  },
};

const PHASE_PLAYBOOKS = {
  menstrual: {
    energy: 'Low',
    approach: 'Comfort mode',
    textStyle: 'Short, warm, no demands. Check in without expecting energy back.',
    dateMove: 'Cozy night in. Bring her favorite food. Movie under blankets.',
    protip: 'This is when she\'ll remember who showed up with zero expectations. Be that guy.',
    texts: [
      'Hey you. No pressure to do anything tonight. Just wanted to check in.',
      'Thinking about you. Rest up, {name}.',
      'Want me to bring food over? Low key night, no expectations.',
    ],
  },
  follicular: {
    energy: 'Rising',
    approach: 'Adventure mode',
    textStyle: 'Upbeat, playful, suggest new experiences. She\'s open to novelty.',
    dateMove: 'Try something she\'s never done. New restaurant, hiking trail, cooking class.',
    protip: 'Her energy is building. Match it. This is when new things stick — new places become "our spot."',
    texts: [
      'I found this spot I think you\'d love. Free this week?',
      'You seem like you\'re in your element lately. I like this energy.',
      'Adventure time? I have an idea you\'re either gonna love or hate.',
    ],
  },
  ovulatory: {
    energy: 'Peak',
    approach: 'Full send',
    textStyle: 'Bold, direct, flirtatious. She\'s at peak confidence and attraction.',
    dateMove: 'Social events, dinners out, anything where she can shine. She wants to be seen.',
    protip: 'This is the window. She\'s most confident, most attracted, most communicative. Lead with energy.',
    texts: [
      'I can\'t stop thinking about you. When am I seeing you?',
      'We need to do something this week. I don\'t want to miss this version of you.',
      'You have this energy right now that I\'m very into. Dinner. You and me. {day}.',
    ],
  },
  luteal: {
    energy: 'Declining',
    approach: 'Sensitivity mode',
    textStyle: 'Reassuring, consistent, avoid mixed signals. She\'s more emotionally tuned in.',
    dateMove: 'Intimate quality time. Cook together. Deep conversation. Thoughtful gestures.',
    protip: 'She\'s reading between every line right now. Be clear with words. No ambiguity.',
    texts: [
      'Just wanted you to know I\'m thinking about you.',
      'How are you really doing? I want to know.',
      'I appreciate you, {name}. More than I probably say.',
    ],
  },
};

/**
 * Get the full communication playbook for a profile.
 */
export function getCommunicationPlaybook({ attachmentStyle, cyclePhase, stage, contactHistory }) {
  const attachment = ATTACHMENT_PLAYBOOKS[attachmentStyle] || ATTACHMENT_PLAYBOOKS.secure;
  const phase = PHASE_PLAYBOOKS[cyclePhase?.id] || PHASE_PLAYBOOKS.follicular;

  return {
    // Attachment intel
    tone: attachment.tone,
    responseTime: attachment.responseTime,
    principles: attachment.principles,
    redFlags: attachment.redFlags,
    avoid: attachment.avoid,
    escalation: attachment.escalation,
    // Phase intel
    phaseEnergy: phase.energy,
    phaseApproach: phase.approach,
    phaseTextStyle: phase.textStyle,
    phaseDateMove: phase.dateMove,
    phaseProtip: phase.protip,
  };
}

/**
 * Generate context-aware text suggestions.
 */
export function generateTextSuggestions({ name, userName, stage, attachmentStyle, loveLanguages, interests, cyclePhase, contactHistory, importantDetails }) {
  const suggestions = [];

  // Determine situation from contact history
  const contacts = contactHistory || [];
  const lastContact = contacts.length > 0 ? contacts[contacts.length - 1] : null;
  const hoursSinceContact = lastContact
    ? (Date.now() - new Date(lastContact.timestamp).getTime()) / (1000 * 60 * 60)
    : Infinity;

  // Get relevant situation templates
  const situations = [];

  if (!lastContact || contacts.length === 0) {
    situations.push('first_text_after_getting_number');
  } else if (hoursSinceContact > 168) { // 7 days
    situations.push('reviving_dead_conversation');
  } else if (lastContact?.type === 'date') {
    situations.push('after_great_date');
  } else if (lastContact?.type === 'ghosted' || lastContact?.type === 'left_on_read') {
    situations.push('she_went_cold');
  }

  // Always include escalation options if stage is Talking or Prospect
  if (['Prospect', 'Talking'].includes(stage)) {
    situations.push('escalating_to_date');
  }

  // Phase-specific texts
  const phase = PHASE_PLAYBOOKS[cyclePhase?.id];
  if (phase?.texts) {
    phase.texts.forEach(t => {
      suggestions.push({
        text: fillTemplate(t, { name, userName, interests, importantDetails }),
        category: `${cyclePhase.label} phase`,
        situation: 'cycle-aware',
      });
    });
  }

  // Situation-specific texts
  for (const sit of situations) {
    const templates = TEXT_SITUATIONS[sit] || [];
    templates.forEach(t => {
      suggestions.push({
        text: fillTemplate(t.text, { name, userName, interests, importantDetails }),
        category: sit.replace(/_/g, ' '),
        situation: sit,
        tone: t.tone,
      });
    });
  }

  // Morning/goodnight based on time of day
  const hour = new Date().getHours();
  if (hour >= 6 && hour <= 10) {
    (TEXT_SITUATIONS.morning_texts || []).forEach(t => {
      suggestions.push({
        text: fillTemplate(t.text, { name, userName, interests, importantDetails }),
        category: 'morning text',
        situation: 'morning',
        tone: t.tone,
      });
    });
  } else if (hour >= 21 || hour <= 1) {
    (TEXT_SITUATIONS.goodnight_texts || []).forEach(t => {
      suggestions.push({
        text: fillTemplate(t.text, { name, userName, interests, importantDetails }),
        category: 'goodnight text',
        situation: 'goodnight',
        tone: t.tone,
      });
    });
  }

  // Love language specific
  if (loveLanguages?.length > 0) {
    const llTexts = {
      'Words of Affirmation': [
        `I really admire how ${interests?.[0] ? 'passionate you are about ' + interests[0] : 'you carry yourself'}.`,
        `You make every room better just by being in it, ${name || 'you know that?'}`,
      ],
      'Acts of Service': [
        `Let me handle dinner tonight. You just show up.`,
        `I took care of that thing we talked about. Don't worry about it.`,
      ],
      'Receiving Gifts': [
        `I saw something today that was so you. Saving it for next time I see you.`,
        `I have something for you. Nothing crazy — just thought of you.`,
      ],
      'Quality Time': [
        `I want a whole evening with you. No phones. Just us.`,
        `Cancel your plans. I'm stealing you for the night.`,
      ],
      'Physical Touch': [
        `I keep thinking about how it feels when you're close to me.`,
        `Get over here. I miss you.`,
      ],
    };

    for (const ll of loveLanguages) {
      const texts = llTexts[ll] || [];
      texts.forEach(t => {
        suggestions.push({
          text: t,
          category: `her language: ${ll.toLowerCase()}`,
          situation: 'love-language',
        });
      });
    }
  }

  // Vulnerability texts (always available for Dating/Exclusive — the depth hook)
  if (['Dating', 'Exclusive'].includes(stage)) {
    const vulnTexts = TEXT_SITUATIONS.she_shared_something_vulnerable || [];
    vulnTexts.forEach(t => {
      suggestions.push({
        text: fillTemplate(t.text, { name, userName, interests, importantDetails }),
        category: 'when she opens up',
        situation: 'vulnerable_response',
        tone: t.tone,
      });
    });
  }

  return suggestions;
}

/**
 * Fill template variables.
 */
function fillTemplate(text, { name, userName, interests, importantDetails }) {
  const detail = importantDetails?.[0]?.text || 'that thing you mentioned';
  const interest = interests?.[0] || 'that thing';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().getDay();
  const suggestedDay = days[(today + 2) % 7]; // suggest 2 days from now

  return text
    .replace(/\{name\}/g, name || 'you')
    .replace(/\{userName\}/g, userName || '')
    .replace(/\{interest\}/g, interest)
    .replace(/\{detail\}/g, detail)
    .replace(/\{thing\}/g, detail)
    .replace(/\{activity\}/g, interest)
    .replace(/\{day\}/g, suggestedDay)
    .replace(/\{topic\}/g, 'earlier')
    .replace(/\{memory\}/g, 'last time')
    .replace(/\{moment\}/g, 'moment');
}

/**
 * Get a "before date" cheat sheet for a profile.
 */
export function getPreDateBriefing(profile, cycleInfo) {
  const phase = PHASE_PLAYBOOKS[cycleInfo?.phase?.id] || PHASE_PLAYBOOKS.follicular;
  const attachment = ATTACHMENT_PLAYBOOKS[profile.attachmentStyle] || ATTACHMENT_PLAYBOOKS.secure;
  const details = profile.importantDetails || [];

  return {
    name: profile.name,
    quickFacts: [
      profile.zodiacSign && `${profile.zodiacSign} (${profile.zodiacSign === 'Scorpio' ? 'intensity' : profile.zodiacSign === 'Gemini' ? 'dual energy' : 'her element'})`,
      profile.attachmentStyle && `${attachment.tone} approach`,
      cycleInfo && `Day ${cycleInfo.cycleDay} — ${cycleInfo.phase.label} (${phase.energy} energy)`,
      profile.loveLanguages?.length > 0 && `Speaks: ${profile.loveLanguages.join(' + ')}`,
      profile.birthControl && profile.birthControl !== 'None' && `BC: ${profile.birthControl}`,
    ].filter(Boolean),
    remember: details.map(d => d.text),
    dateVibe: phase.dateMove,
    communicationNote: phase.phaseTextStyle || phase.textStyle,
    escalationStyle: attachment.escalation,
    avoid: attachment.avoid,
    interests: profile.interests?.slice(0, 5) || [],
    values: profile.values?.slice(0, 3) || [],
  };
}
