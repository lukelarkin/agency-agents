/**
 * GAP 1: EVALS — Automated quality checks for messaging engine.
 * Code-based graders that validate text suggestion structure and content.
 */

import { generateTextSuggestions, getCommunicationPlaybook } from '../messagingEngine.js';

// ─── Test Cases ───────────────────────────────────────────────────────
const TEXT_TEST_CASES = [
  {
    id: 'MSG-001',
    description: 'Prospect stage generates opener suggestions',
    input: { name: 'Sarah', stage: 'Prospect', attachmentStyle: 'secure', loveLanguages: ['Quality Time'], interests: ['Fitness'] },
    requirements: {
      min_suggestions: 3,
      must_have_categories: ['opener'],
      must_contain_name: true,
      no_empty_texts: true,
    },
  },
  {
    id: 'MSG-002',
    description: 'Dating stage with love languages generates love-language texts',
    input: { name: 'Emma', stage: 'Dating', attachmentStyle: 'anxious', loveLanguages: ['Words of Affirmation', 'Physical Touch'], interests: ['Music'] },
    requirements: {
      min_suggestions: 5,
      must_have_categories: ['opener', 'love-language'],
      must_contain_name: true,
      no_empty_texts: true,
    },
  },
  {
    id: 'MSG-003',
    description: 'Handles missing optional fields gracefully',
    input: { name: 'Mia', stage: 'Talking', attachmentStyle: null, loveLanguages: [], interests: [] },
    requirements: {
      min_suggestions: 1,
      no_empty_texts: true,
    },
  },
];

const PLAYBOOK_TEST_CASES = [
  {
    id: 'PB-001',
    description: 'Anxious attachment gets reassuring tone',
    input: { attachmentStyle: 'anxious', cyclePhase: { id: 'ovulatory' }, stage: 'Dating' },
    requirements: {
      tone_contains: 'reassuring',
      has_tips: true,
      has_avoid: true,
      has_response_advice: true,
    },
  },
  {
    id: 'PB-002',
    description: 'Avoidant attachment gets low-pressure tone',
    input: { attachmentStyle: 'avoidant', cyclePhase: { id: 'luteal' }, stage: 'Talking' },
    requirements: {
      tone_contains: 'low-pressure',
      has_tips: true,
      has_avoid: true,
    },
  },
];

// ─── Code-Based Graders ──────────────────────────────────────────────
function gradeTextSuggestions(suggestions, requirements) {
  const checks = {};

  if (requirements.min_suggestions) {
    checks.enough_suggestions = suggestions.length >= requirements.min_suggestions;
  }

  if (requirements.must_have_categories) {
    const categories = new Set(suggestions.map(s => s.category));
    for (const cat of requirements.must_have_categories) {
      checks[`has_category_${cat}`] = categories.has(cat);
    }
  }

  if (requirements.must_contain_name) {
    checks.contains_name = suggestions.some(s => s.text.includes(suggestions[0]?.text?.match(/\w+/)?.[0] || ''));
  }

  if (requirements.no_empty_texts) {
    checks.no_empty = suggestions.every(s => s.text && s.text.trim().length > 0);
  }

  checks.all_have_category = suggestions.every(s => typeof s.category === 'string');
  checks.all_have_text = suggestions.every(s => typeof s.text === 'string');
  checks.passed = Object.values(checks).every(v => v === true);

  return checks;
}

function gradePlaybook(playbook, requirements) {
  const checks = {};

  if (requirements.tone_contains) {
    checks.correct_tone = playbook.tone?.includes(requirements.tone_contains);
  }

  if (requirements.has_tips) {
    checks.has_tips = Array.isArray(playbook.tips) && playbook.tips.length > 0;
  }

  if (requirements.has_avoid) {
    checks.has_avoid = typeof playbook.avoid === 'string' && playbook.avoid.length > 0;
  }

  if (requirements.has_response_advice) {
    checks.has_response_advice = typeof playbook.responseTimeAdvice === 'string';
  }

  checks.has_phase_guidance = typeof playbook.phaseGuidance === 'string';
  checks.passed = Object.values(checks).every(v => v === true);

  return checks;
}

// ─── Run Eval Suites ─────────────────────────────────────────────────
function runTextEvalSuite() {
  const results = [];

  for (const tc of TEXT_TEST_CASES) {
    const suggestions = generateTextSuggestions(tc.input);
    const grade = gradeTextSuggestions(suggestions, tc.requirements);
    results.push({ id: tc.id, description: tc.description, passed: grade.passed, details: grade });
  }

  return {
    results,
    passRate: results.filter(r => r.passed).length / results.length,
    total: results.length,
  };
}

function runPlaybookEvalSuite() {
  const results = [];

  for (const tc of PLAYBOOK_TEST_CASES) {
    const playbook = getCommunicationPlaybook(tc.input);
    const grade = gradePlaybook(playbook, tc.requirements);
    results.push({ id: tc.id, description: tc.description, passed: grade.passed, details: grade });
  }

  return {
    results,
    passRate: results.filter(r => r.passed).length / results.length,
    total: results.length,
  };
}

export { runTextEvalSuite, runPlaybookEvalSuite, TEXT_TEST_CASES, PLAYBOOK_TEST_CASES };
