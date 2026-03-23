/**
 * Spot Finder — Smart date location engine.
 * Finds equidistant spots, scores by budget/vibe/effort, manages venue knowledge.
 *
 * In production, this would integrate with Google Maps API or a scraper.
 * Currently uses a local venue model that the user can populate +
 * geometric midpoint calculation for "meet in the middle" logic.
 */

import { DATE_TYPES } from '../models/schemas.js';

/**
 * Calculate geographic midpoint between two coordinates.
 * @param {Object} loc1 - { lat, lng }
 * @param {Object} loc2 - { lat, lng }
 * @returns {Object} { lat, lng }
 */
export function getMidpoint(loc1, loc2) {
  if (!loc1 || !loc2) return null;

  // Convert to radians
  const lat1 = loc1.lat * Math.PI / 180;
  const lng1 = loc1.lng * Math.PI / 180;
  const lat2 = loc2.lat * Math.PI / 180;
  const lng2 = loc2.lng * Math.PI / 180;

  // Midpoint on a sphere
  const Bx = Math.cos(lat2) * Math.cos(lng2 - lng1);
  const By = Math.cos(lat2) * Math.sin(lng2 - lng1);

  const midLat = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) ** 2 + By ** 2)
  );
  const midLng = lng1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return {
    lat: midLat * 180 / Math.PI,
    lng: midLng * 180 / Math.PI,
  };
}

/**
 * Calculate distance between two points in miles.
 */
export function getDistanceMiles(loc1, loc2) {
  const R = 3959; // Earth radius in miles
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Score and rank saved venues against criteria.
 * @param {Array} venues - User's saved venues
 * @param {Object} criteria - { budget, dateType, maxDriveMinutes, midpoint, mood }
 * @returns {Array} Ranked venues with scores
 */
export function rankVenues(venues, criteria = {}) {
  if (!venues || venues.length === 0) return [];

  return venues
    .map(v => {
      let score = 50; // Base score

      // Budget match
      if (criteria.budget) {
        const costMap = { 'Free': 0, '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
        const venueCost = costMap[v.cost] || 2;
        const budgetLevel = criteria.budget === 'broke' ? 1 : criteria.budget === 'comfortable' ? 2 : 3;
        if (venueCost <= budgetLevel) score += 20;
        else if (venueCost === budgetLevel + 1) score += 5;
        else score -= 15;
      }

      // Date type match
      if (criteria.dateType && v.type === criteria.dateType) {
        score += 25;
      }

      // Distance from midpoint (if available)
      let distanceFromMid = null;
      if (criteria.midpoint && v.lat && v.lng) {
        distanceFromMid = getDistanceMiles(criteria.midpoint, { lat: v.lat, lng: v.lng });
        if (distanceFromMid <= 2) score += 20;
        else if (distanceFromMid <= 5) score += 10;
        else if (distanceFromMid <= 10) score += 0;
        else score -= 10;
      }

      // Rating bonus
      if (v.rating) score += (v.rating - 3) * 5;

      // Vibe match
      if (criteria.mood && v.vibe === criteria.mood) score += 10;

      // Previously successful (user flagged as good date spot)
      if (v.workedBefore) score += 15;

      return {
        ...v,
        score: Math.max(0, Math.min(100, score)),
        distanceFromMid: distanceFromMid ? `${distanceFromMid.toFixed(1)} mi from midpoint` : null,
      };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Suggest a date type based on relationship stage, budget, and her cycle phase.
 */
export function suggestDateType(stage, budget, cyclePhase) {
  const budgetMap = { broke: ['coffee', 'walk', 'home'], comfortable: ['coffee', 'drinks', 'activity', 'walk', 'home'], flush: ['drinks', 'dinner', 'activity', 'adventure', 'event'] };
  const allowed = budgetMap[budget] || budgetMap.comfortable;

  const phasePrefs = {
    menstrual: ['home', 'coffee', 'walk'],
    follicular: ['activity', 'adventure', 'drinks'],
    ovulatory: ['drinks', 'dinner', 'event', 'activity'],
    luteal: ['home', 'coffee', 'dinner'],
  };

  const stagePrefs = {
    Prospect: ['coffee', 'walk', 'drinks'],
    Talking: ['coffee', 'drinks', 'activity'],
    Dating: ['dinner', 'activity', 'event', 'adventure'],
    Exclusive: ['dinner', 'home', 'adventure', 'event'],
  };

  // Find the intersection of allowed + preferred
  const phaseList = phasePrefs[cyclePhase?.id] || phasePrefs.follicular;
  const stageList = stagePrefs[stage] || stagePrefs.Talking;

  // Score each date type
  const scores = {};
  for (const dt of DATE_TYPES) {
    let s = 0;
    if (allowed.includes(dt.id)) s += 10;
    if (phaseList.includes(dt.id)) s += 5;
    if (stageList.includes(dt.id)) s += 5;
    scores[dt.id] = s;
  }

  const ranked = DATE_TYPES
    .filter(dt => allowed.includes(dt.id))
    .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  return ranked.slice(0, 3);
}

/**
 * Create a new venue entry.
 */
export function createVenue(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    name: '',
    type: 'drinks', // coffee, walk, drinks, dinner, activity, etc.
    cost: '$$',
    neighborhood: '',
    lat: null,
    lng: null,
    vibe: '', // romantic, casual, energetic, chill
    rating: 4,
    notes: '',
    workedBefore: false,
    addedAt: new Date().toISOString(),
    ...overrides,
  };
}
