/**
 * Eval Suite: Date Planner
 * Tests budget reporting, date plan generation, and cost estimation.
 */

import { describe, it, expect } from 'vitest';
import { getBudgetReport, generateDatePlan, getDateCostEstimate } from '../src/utils/datePlanner.js';

// ── BUDGET REPORT ────────────────────────────────────────────────

describe('getBudgetReport', () => {
  const emptyProfiles = [];

  it('returns correct defaults for comfortable tier', () => {
    const report = getBudgetReport({ tier: 'comfortable' }, emptyProfiles);
    expect(report.monthlyBudget).toBe(300);
    expect(report.monthSpend).toBe(0);
    expect(report.remaining).toBe(300);
    expect(report.statusLevel).toBe('good');
  });

  it('returns broke tier budget correctly', () => {
    const report = getBudgetReport({ tier: 'broke' }, emptyProfiles);
    expect(report.monthlyBudget).toBe(100);
  });

  it('uses custom monthly budget when provided', () => {
    const report = getBudgetReport({ tier: 'comfortable', customMonthly: 500 }, emptyProfiles);
    expect(report.monthlyBudget).toBe(500);
  });

  it('tracks spending from date logs this month', () => {
    const today = new Date().toISOString().split('T')[0];
    const profiles = [{
      name: 'Test',
      dateLog: [
        { date: today, activity: 'dinner', estimatedCost: 70 },
        { date: today, activity: 'coffee', estimatedCost: 15 },
      ],
    }];
    const report = getBudgetReport({ tier: 'comfortable' }, profiles);
    expect(report.monthSpend).toBe(85);
    expect(report.remaining).toBe(215);
    expect(report.datesThisMonth).toBe(2);
    expect(report.spendByPerson['Test']).toBe(85);
  });

  it('flags over-budget status', () => {
    const today = new Date().toISOString().split('T')[0];
    const profiles = [{
      name: 'Big Spender',
      dateLog: [
        { date: today, activity: 'dinner', estimatedCost: 120 },
      ],
    }];
    const report = getBudgetReport({ tier: 'broke' }, profiles);
    expect(report.statusLevel).not.toBe('good');
  });
});

// ── DATE COST ESTIMATES ──────────────────────────────────────────

describe('getDateCostEstimate', () => {
  it('returns correct structure for all date types', () => {
    for (const type of ['coffee', 'walk', 'drinks', 'dinner', 'activity', 'adventure', 'home', 'event']) {
      const cost = getDateCostEstimate(type);
      expect(cost).toHaveProperty('low');
      expect(cost).toHaveProperty('avg');
      expect(cost).toHaveProperty('high');
      expect(cost.low).toBeLessThanOrEqual(cost.avg);
      expect(cost.avg).toBeLessThanOrEqual(cost.high);
    }
  });

  it('walk is cheapest', () => {
    const walk = getDateCostEstimate('walk');
    const dinner = getDateCostEstimate('dinner');
    expect(walk.avg).toBeLessThan(dinner.avg);
  });

  it('returns default for unknown type', () => {
    const result = getDateCostEstimate('spaceflight');
    expect(result).toHaveProperty('low');
  });
});

// ── DATE PLAN GENERATION ─────────────────────────────────────────

describe('generateDatePlan', () => {
  it('returns empty array for no profiles', () => {
    const budget = getBudgetReport({ tier: 'comfortable' }, []);
    const plan = generateDatePlan([], budget);
    expect(plan).toEqual([]);
  });

  it('excludes archived profiles', () => {
    const profiles = [
      { id: '1', name: 'Active', relationshipStage: 'Talking', dateLog: [], contactLog: [] },
      { id: '2', name: 'Gone', relationshipStage: 'Archived', dateLog: [], contactLog: [] },
    ];
    const budget = getBudgetReport({ tier: 'comfortable' }, profiles);
    const plan = generateDatePlan(profiles, budget);
    expect(plan.every(p => p.profile.name !== 'Gone')).toBe(true);
  });

  it('ranks Dating stage higher than Prospect', () => {
    const profiles = [
      { id: '1', name: 'Prospect Girl', relationshipStage: 'Prospect', dateLog: [], contactLog: [] },
      { id: '2', name: 'Dating Girl', relationshipStage: 'Dating', dateLog: [], contactLog: [] },
    ];
    const budget = getBudgetReport({ tier: 'comfortable' }, profiles);
    const plan = generateDatePlan(profiles, budget);
    const datingRank = plan.find(p => p.profile.name === 'Dating Girl')?.rank;
    const prospectRank = plan.find(p => p.profile.name === 'Prospect Girl')?.rank;
    expect(datingRank).toBeLessThan(prospectRank);
  });

  it('limits results to maxDatesPerWeek', () => {
    const profiles = Array.from({ length: 10 }, (_, i) => ({
      id: String(i), name: `Girl ${i}`, relationshipStage: 'Talking', dateLog: [], contactLog: [],
    }));
    const budget = getBudgetReport({ tier: 'comfortable' }, profiles);
    const plan = generateDatePlan(profiles, budget, { maxDatesPerWeek: 2 });
    expect(plan.length).toBeLessThanOrEqual(2);
  });

  it('includes budget advice when over budget', () => {
    const today = new Date().toISOString().split('T')[0];
    const profiles = [{
      id: '1', name: 'Her', relationshipStage: 'Dating',
      dateLog: [{ date: today, activity: 'dinner', estimatedCost: 100 }],
      contactLog: [],
    }];
    const budget = getBudgetReport({ tier: 'broke' }, profiles);
    const plan = generateDatePlan(profiles, budget);
    // Budget remaining should be 0, so canAfford might be false for pricier suggestions
    if (plan.length > 0 && !plan[0].canAfford) {
      expect(plan[0].budgetAdvice).toBeDefined();
    }
  });

  it('each plan item has required fields', () => {
    const profiles = [
      { id: '1', name: 'Test', relationshipStage: 'Talking', dateLog: [], contactLog: [] },
    ];
    const budget = getBudgetReport({ tier: 'comfortable' }, profiles);
    const plan = generateDatePlan(profiles, budget);
    if (plan.length > 0) {
      expect(plan[0]).toHaveProperty('rank');
      expect(plan[0]).toHaveProperty('priority');
      expect(plan[0]).toHaveProperty('suggestedDateTypes');
      expect(plan[0]).toHaveProperty('reasoning');
      expect(plan[0]).toHaveProperty('canAfford');
    }
  });
});
