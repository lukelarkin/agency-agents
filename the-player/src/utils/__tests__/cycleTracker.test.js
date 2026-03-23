/**
 * GAP 1: EVALS — Automated quality checks for cycle tracking logic.
 * Code-based graders that validate structural correctness.
 */

import { getCycleInfo, getDateRecommendation } from '../cycleTracker.js';

// ─── Test Cases ───────────────────────────────────────────────────────
const TEST_CASES = [
  {
    id: 'CYCLE-001',
    description: 'Day 1 should be menstrual phase',
    lastPeriodStart: new Date().toISOString().split('T')[0], // today = day 1
    cycleLength: 28,
    expected: { phaseId: 'menstrual', cycleDayMin: 1, cycleDayMax: 1 },
  },
  {
    id: 'CYCLE-002',
    description: 'Day 14 should be ovulatory phase',
    lastPeriodStart: (() => { const d = new Date(); d.setDate(d.getDate() - 13); return d.toISOString().split('T')[0]; })(),
    cycleLength: 28,
    expected: { phaseId: 'ovulatory', cycleDayMin: 14, cycleDayMax: 14 },
  },
  {
    id: 'CYCLE-003',
    description: 'Day 20 should be luteal phase',
    lastPeriodStart: (() => { const d = new Date(); d.setDate(d.getDate() - 19); return d.toISOString().split('T')[0]; })(),
    cycleLength: 28,
    expected: { phaseId: 'luteal', cycleDayMin: 20, cycleDayMax: 20 },
  },
  {
    id: 'CYCLE-004',
    description: 'Null input returns null',
    lastPeriodStart: null,
    cycleLength: 28,
    expected: null,
  },
  {
    id: 'CYCLE-005',
    description: 'Day 7 should be follicular phase',
    lastPeriodStart: (() => { const d = new Date(); d.setDate(d.getDate() - 6); return d.toISOString().split('T')[0]; })(),
    cycleLength: 28,
    expected: { phaseId: 'follicular', cycleDayMin: 7, cycleDayMax: 7 },
  },
  {
    id: 'CYCLE-006',
    description: 'Fertile window detection on day 14',
    lastPeriodStart: (() => { const d = new Date(); d.setDate(d.getDate() - 13); return d.toISOString().split('T')[0]; })(),
    cycleLength: 28,
    expected: { phaseId: 'ovulatory', fertile: true },
  },
];

// ─── Code-Based Grader ────────────────────────────────────────────────
function gradeCycleResult(result, expected) {
  const checks = {};

  if (expected === null) {
    checks.null_handling = result === null;
    checks.passed = checks.null_handling;
    return checks;
  }

  checks.has_cycleDay = typeof result?.cycleDay === 'number';
  checks.has_phase = typeof result?.phase?.id === 'string';
  checks.has_daysLeftInPhase = typeof result?.daysLeftInPhase === 'number';
  checks.has_nextPeriodDate = typeof result?.nextPeriodDate === 'string';
  checks.has_fertile = typeof result?.fertile === 'boolean';

  if (expected.phaseId) {
    checks.correct_phase = result?.phase?.id === expected.phaseId;
  }
  if (expected.cycleDayMin != null) {
    checks.cycle_day_in_range = result?.cycleDay >= expected.cycleDayMin && result?.cycleDay <= expected.cycleDayMax;
  }
  if (expected.fertile != null) {
    checks.fertile_correct = result?.fertile === expected.fertile;
  }

  checks.passed = Object.values(checks).every(v => v === true);
  return checks;
}

// ─── Run Eval Suite ───────────────────────────────────────────────────
function runEvalSuite() {
  const results = [];

  for (const tc of TEST_CASES) {
    const result = getCycleInfo(tc.lastPeriodStart, tc.cycleLength);
    const grade = gradeCycleResult(result, tc.expected);

    results.push({
      id: tc.id,
      description: tc.description,
      passed: grade.passed,
      details: grade,
    });
  }

  const passRate = results.filter(r => r.passed).length / results.length;
  return { results, passRate, total: results.length };
}

// ─── Date Recommendation Grader ───────────────────────────────────────
function gradeDateRecommendation(phase) {
  const rec = getDateRecommendation(phase);
  const checks = {};

  checks.has_ideal = typeof rec?.ideal === 'string' && rec.ideal.length > 10;
  checks.has_texting = typeof rec?.texting === 'string' && rec.texting.length > 10;
  checks.has_energy = typeof rec?.energy === 'string';
  checks.has_tip = typeof rec?.tip === 'string' && rec.tip.length > 10;
  checks.passed = Object.values(checks).every(v => v === true);

  return checks;
}

// ─── Export for Node/test runner usage ────────────────────────────────
export { runEvalSuite, gradeCycleResult, gradeDateRecommendation, TEST_CASES };
