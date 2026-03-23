/**
 * Date Planner — Smart scheduling with budget awareness.
 * Prioritizes who to see based on interest level, availability windows,
 * and budget constraints. Tracks spending and adjusts strategy.
 */

import { BUDGET_TIERS, DATE_TYPES } from '../models/schemas.js';
import { getCycleInfo } from './cycleTracker.js';
import { suggestDateType } from './spotFinder.js';

/**
 * Calculate monthly dating budget status.
 * @param {Object} budgetSettings - { tier, customMonthly }
 * @param {Array} profiles - All profiles with date logs
 * @returns {Object} Budget report
 */
export function getBudgetReport(budgetSettings, profiles) {
  const tier = BUDGET_TIERS.find(t => t.id === budgetSettings?.tier) || BUDGET_TIERS[1];
  const monthlyBudget = budgetSettings?.customMonthly || tier.monthly;

  // Calculate spend this month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  let monthSpend = 0;
  let dateCount = 0;
  const spendByPerson = {};

  for (const p of profiles) {
    let personSpend = 0;
    for (const d of (p.dateLog || [])) {
      const dateDate = new Date(d.date);
      if (dateDate >= monthStart) {
        const cost = d.estimatedCost || estimateDateCost(d.activity);
        monthSpend += cost;
        personSpend += cost;
        dateCount++;
      }
    }
    if (personSpend > 0) {
      spendByPerson[p.name] = personSpend;
    }
  }

  const remaining = monthlyBudget - monthSpend;
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  const perDateBudget = dateCount > 0 ? Math.round(monthSpend / dateCount) : tier.perDate;
  const datesRemaining = remaining > 0 ? Math.floor(remaining / perDateBudget) : 0;

  let statusMessage = '';
  let statusLevel = 'good';

  if (remaining <= 0) {
    statusMessage = 'You\'ve hit your dating budget this month. Free dates only: walks, parks, home cooking. Creativity time.';
    statusLevel = 'over';
  } else if (remaining < tier.perDate * 2) {
    statusMessage = `$${remaining} left this month. Enough for ${datesRemaining} more date${datesRemaining !== 1 ? 's' : ''}. Be strategic about who gets the spend.`;
    statusLevel = 'tight';
  } else {
    statusMessage = `$${remaining} left. You can afford ${datesRemaining} more dates at your current pace. You're good.`;
    statusLevel = 'good';
  }

  return {
    monthlyBudget,
    monthSpend: Math.round(monthSpend),
    remaining: Math.round(remaining),
    datesThisMonth: dateCount,
    datesRemaining,
    perDateAvg: perDateBudget,
    spendByPerson,
    statusMessage,
    statusLevel,
    tierStrategy: tier.strategy,
    tier: tier.id,
  };
}

/**
 * Estimate cost from activity description.
 */
function estimateDateCost(activity) {
  if (!activity) return 20;
  const lower = activity.toLowerCase();
  if (/walk|park|hike|free/i.test(lower)) return 0;
  if (/coffee|cafe/i.test(lower)) return 12;
  if (/drink|bar|beer|cocktail/i.test(lower)) return 35;
  if (/dinner|restaurant|steak/i.test(lower)) return 65;
  if (/movie|show|concert|event/i.test(lower)) return 50;
  if (/cook|home|netflix/i.test(lower)) return 15;
  if (/bowling|mini golf|arcade|activity/i.test(lower)) return 30;
  return 25;
}

/**
 * Generate a prioritized dating schedule.
 * @param {Array} profiles - Active profiles
 * @param {Object} budgetReport - From getBudgetReport()
 * @param {Object} userPrefs - { maxDatesPerWeek, availableDays }
 * @returns {Array} Prioritized date recommendations
 */
export function generateDatePlan(profiles, budgetReport, userPrefs = {}) {
  const maxPerWeek = userPrefs.maxDatesPerWeek || 3;
  const active = profiles.filter(p => !['Archived', 'On Hold'].includes(p.relationshipStage));

  const scored = active.map(p => {
    let priority = 50;
    const cycle = p.lastPeriodStart ? getCycleInfo(p.lastPeriodStart, p.cycleLength) : null;

    // Stage weight: further along = more investment-worthy
    const stageWeight = { Prospect: 1, Talking: 2, Dating: 4, Exclusive: 5, Complicated: 3 };
    priority += (stageWeight[p.relationshipStage] || 1) * 5;

    // Cycle bonus: ovulatory = ideal window
    if (cycle?.phase?.id === 'ovulatory') priority += 15;
    if (cycle?.phase?.id === 'follicular') priority += 8;

    // Date history: high-rated past dates = worth reinvesting
    const dates = p.dateLog || [];
    const recentDates = dates.slice(-3);
    const avgRating = recentDates.length > 0
      ? recentDates.reduce((s, d) => s + d.howItWent, 0) / recentDates.length
      : 3;
    priority += (avgRating - 3) * 8;

    // Contact momentum: active conversations deserve follow-through
    const contacts = p.contactLog || [];
    if (contacts.length > 0) {
      const lastContact = contacts[contacts.length - 1];
      const hoursSince = (Date.now() - new Date(lastContact.timestamp).getTime()) / 3600000;
      if (hoursSince < 48 && ['text_received', 'she_initiated'].includes(lastContact.type)) {
        priority += 10; // She's engaged, strike while hot
      }
    }

    // Never been on a date penalty (prospects need to convert)
    if (dates.length === 0 && p.relationshipStage !== 'Prospect') {
      priority += 5; // Talking but no date = convert
    }

    // Budget-aware date type suggestion
    const suggestedTypes = suggestDateType(
      p.relationshipStage,
      budgetReport.tier,
      cycle?.phase
    );

    return {
      profileId: p.id,
      profile: p,
      priority: Math.round(priority),
      cycle,
      suggestedDateTypes: suggestedTypes,
      estimatedCost: suggestedTypes[0] ? estimateDateCost(suggestedTypes[0].label) : 20,
      reasoning: buildReasoning(p, cycle, avgRating, contacts),
    };
  });

  // Sort by priority, limit to max per week
  return scored
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxPerWeek)
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
      canAfford: budgetReport.remaining >= item.estimatedCost,
      budgetAdvice: budgetReport.remaining < item.estimatedCost
        ? `Over budget — try a free date: walk, park, or home hang.`
        : null,
    }));
}

function buildReasoning(profile, cycle, avgRating, contacts) {
  const reasons = [];

  if (cycle?.phase?.id === 'ovulatory') reasons.push('She\'s in her peak window right now');
  if (avgRating >= 4) reasons.push('Past dates went well — reinvest');
  if (contacts.length > 3) reasons.push('Active conversation momentum');
  if (profile.relationshipStage === 'Dating') reasons.push('Dating stage — maintain consistency');
  if (profile.relationshipStage === 'Talking' && (profile.dateLog || []).length === 0) {
    reasons.push('You\'re talking but haven\'t met yet — convert to a date');
  }

  return reasons.length > 0 ? reasons.join('. ') + '.' : 'Standard priority.';
}

/**
 * Smart date cost estimator for planning.
 */
export function getDateCostEstimate(dateTypeId) {
  const costs = {
    coffee: { low: 8, avg: 15, high: 25 },
    walk: { low: 0, avg: 0, high: 10 },
    drinks: { low: 20, avg: 40, high: 70 },
    dinner: { low: 40, avg: 70, high: 120 },
    activity: { low: 20, avg: 40, high: 60 },
    adventure: { low: 15, avg: 35, high: 80 },
    home: { low: 10, avg: 20, high: 40 },
    event: { low: 30, avg: 60, high: 100 },
  };
  return costs[dateTypeId] || costs.drinks;
}
