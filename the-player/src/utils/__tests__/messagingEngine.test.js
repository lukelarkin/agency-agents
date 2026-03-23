/**
 * EVALS for the rebuilt messaging engine.
 * Tests context-aware text generation and communication playbooks.
 */

import { generateTextSuggestions, getCommunicationPlaybook, getPreDateBriefing } from '../messagingEngine.js';

const TEXT_TEST_CASES = [
  {
    id: 'MSG-001',
    description: 'New prospect with no contact history gets "first text" suggestions',
    input: {
      name: 'Sarah', userName: 'Jake', stage: 'Prospect', attachmentStyle: 'secure',
      loveLanguages: ['Quality Time'], interests: ['Fitness'], cyclePhase: { id: 'ovulatory', label: 'Ovulatory' },
      contactHistory: [], importantDetails: [],
    },
    requirements: {
      min_suggestions: 3,
      must_have_situations: ['first_text_after_getting_number'],
      no_empty_texts: true,
      must_personalize: true,
    },
  },
  {
    id: 'MSG-002',
    description: 'Dating stage with love languages generates love-language texts',
    input: {
      name: 'Emma', userName: 'Luke', stage: 'Dating', attachmentStyle: 'anxious',
      loveLanguages: ['Words of Affirmation', 'Physical Touch'], interests: ['Music'],
      cyclePhase: { id: 'luteal', label: 'Luteal' },
      contactHistory: [{ type: 'date', timestamp: new Date(Date.now() - 3600000).toISOString() }],
      importantDetails: [{ text: 'Dog named Cooper' }],
    },
    requirements: {
      min_suggestions: 5,
      must_have_situations: ['after_great_date'],
      no_empty_texts: true,
    },
  },
  {
    id: 'MSG-003',
    description: 'Dead conversation gets revival texts',
    input: {
      name: 'Mia', userName: 'Dan', stage: 'Talking', attachmentStyle: 'avoidant',
      loveLanguages: [], interests: ['Travel'],
      cyclePhase: { id: 'follicular', label: 'Follicular' },
      contactHistory: [{ type: 'text_sent', timestamp: new Date(Date.now() - 8 * 86400000).toISOString() }],
      importantDetails: [],
    },
    requirements: {
      min_suggestions: 3,
      must_have_situations: ['reviving_dead_conversation'],
      no_empty_texts: true,
    },
  },
  {
    id: 'MSG-004',
    description: 'Handles totally empty profile gracefully',
    input: {
      name: 'Unknown', stage: 'Prospect', attachmentStyle: null,
      loveLanguages: [], interests: [], cyclePhase: null,
      contactHistory: [], importantDetails: [],
    },
    requirements: {
      min_suggestions: 1,
      no_empty_texts: true,
      no_crash: true,
    },
  },
];

const PLAYBOOK_TEST_CASES = [
  {
    id: 'PB-001',
    description: 'Anxious attachment returns deep playbook',
    input: { attachmentStyle: 'anxious', cyclePhase: { id: 'ovulatory' }, stage: 'Dating' },
    requirements: {
      has_principles: true,
      min_principles: 3,
      has_red_flags: true,
      has_escalation: true,
      tone_contains: 'Reassuring',
    },
  },
  {
    id: 'PB-002',
    description: 'Avoidant attachment playbook',
    input: { attachmentStyle: 'avoidant', cyclePhase: { id: 'luteal' }, stage: 'Talking' },
    requirements: {
      has_principles: true,
      tone_contains: 'Light',
      has_avoid: true,
    },
  },
  {
    id: 'PB-003',
    description: 'Phase playbook includes energy and approach',
    input: { attachmentStyle: 'secure', cyclePhase: { id: 'menstrual' }, stage: 'Dating' },
    requirements: {
      has_phase_energy: true,
      has_phase_protip: true,
    },
  },
];

const BRIEFING_TEST_CASES = [
  {
    id: 'BR-001',
    description: 'Pre-date briefing includes quick facts',
    profile: {
      name: 'Aria', zodiacSign: 'Scorpio', attachmentStyle: 'anxious',
      loveLanguages: ['Physical Touch'], interests: ['Art', 'Nightlife'],
      values: ['Creativity'], birthControl: 'IUD (Copper)',
      importantDetails: [{ text: 'Allergic to shellfish' }, { text: 'Cat named Luna' }],
    },
    cycleInfo: { phase: { id: 'ovulatory', label: 'Ovulatory' }, cycleDay: 14 },
    requirements: {
      has_quick_facts: true,
      min_quick_facts: 3,
      has_remember: true,
      has_date_vibe: true,
    },
  },
];

function gradeTextSuggestions(suggestions, requirements) {
  const checks = {};

  if (requirements.min_suggestions) {
    checks.enough_suggestions = suggestions.length >= requirements.min_suggestions;
  }

  if (requirements.no_empty_texts) {
    checks.no_empty = suggestions.every(s => s.text && s.text.trim().length > 0);
  }

  if (requirements.must_have_situations) {
    for (const sit of requirements.must_have_situations) {
      checks[`has_${sit}`] = suggestions.some(s => s.situation === sit);
    }
  }

  checks.all_have_category = suggestions.every(s => typeof s.category === 'string');
  checks.all_have_text = suggestions.every(s => typeof s.text === 'string');
  checks.no_unresolved_templates = suggestions.every(s => !s.text.includes('{'));
  checks.passed = Object.values(checks).every(v => v === true);
  return checks;
}

function gradePlaybook(playbook, requirements) {
  const checks = {};

  if (requirements.has_principles) {
    checks.has_principles = Array.isArray(playbook.principles) && playbook.principles.length > 0;
    if (requirements.min_principles) {
      checks.enough_principles = playbook.principles.length >= requirements.min_principles;
    }
  }
  if (requirements.has_red_flags) {
    checks.has_red_flags = typeof playbook.redFlags === 'string' && playbook.redFlags.length > 10;
  }
  if (requirements.has_escalation) {
    checks.has_escalation = typeof playbook.escalation === 'string' && playbook.escalation.length > 5;
  }
  if (requirements.tone_contains) {
    checks.correct_tone = playbook.tone?.includes(requirements.tone_contains);
  }
  if (requirements.has_avoid) {
    checks.has_avoid = typeof playbook.avoid === 'string' && playbook.avoid.length > 5;
  }
  if (requirements.has_phase_energy) {
    checks.has_phase_energy = typeof playbook.phaseEnergy === 'string';
  }
  if (requirements.has_phase_protip) {
    checks.has_phase_protip = typeof playbook.phaseProtip === 'string' && playbook.phaseProtip.length > 10;
  }

  checks.passed = Object.values(checks).every(v => v === true);
  return checks;
}

function gradeBriefing(briefing, requirements) {
  const checks = {};

  if (requirements.has_quick_facts) {
    checks.has_quick_facts = Array.isArray(briefing.quickFacts) && briefing.quickFacts.length > 0;
    if (requirements.min_quick_facts) {
      checks.enough_facts = briefing.quickFacts.length >= requirements.min_quick_facts;
    }
  }
  if (requirements.has_remember) {
    checks.has_remember = Array.isArray(briefing.remember) && briefing.remember.length > 0;
  }
  if (requirements.has_date_vibe) {
    checks.has_date_vibe = typeof briefing.dateVibe === 'string' && briefing.dateVibe.length > 5;
  }

  checks.passed = Object.values(checks).every(v => v === true);
  return checks;
}

export function runTextEvalSuite() {
  const results = [];
  for (const tc of TEXT_TEST_CASES) {
    const suggestions = generateTextSuggestions(tc.input);
    const grade = gradeTextSuggestions(suggestions, tc.requirements);
    results.push({ id: tc.id, description: tc.description, passed: grade.passed, details: grade, count: suggestions.length });
  }
  return { results, passRate: results.filter(r => r.passed).length / results.length, total: results.length };
}

export function runPlaybookEvalSuite() {
  const results = [];
  for (const tc of PLAYBOOK_TEST_CASES) {
    const playbook = getCommunicationPlaybook(tc.input);
    const grade = gradePlaybook(playbook, tc.requirements);
    results.push({ id: tc.id, description: tc.description, passed: grade.passed, details: grade });
  }
  return { results, passRate: results.filter(r => r.passed).length / results.length, total: results.length };
}

export function runBriefingEvalSuite() {
  const results = [];
  for (const tc of BRIEFING_TEST_CASES) {
    const briefing = getPreDateBriefing(tc.profile, tc.cycleInfo);
    const grade = gradeBriefing(briefing, tc.requirements);
    results.push({ id: tc.id, description: tc.description, passed: grade.passed, details: grade });
  }
  return { results, passRate: results.filter(r => r.passed).length / results.length, total: results.length };
}

export { TEXT_TEST_CASES, PLAYBOOK_TEST_CASES, BRIEFING_TEST_CASES };
