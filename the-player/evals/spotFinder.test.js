/**
 * Eval Suite: Spot Finder
 * Tests midpoint calculation, distance math, venue ranking, and date type suggestions.
 */

import { describe, it, expect } from 'vitest';
import { getMidpoint, getDistanceMiles, rankVenues, suggestDateType, createVenue } from '../src/utils/spotFinder.js';

// ── MIDPOINT CALCULATION ─────────────────────────────────────────

describe('getMidpoint', () => {
  it('returns null when either location is missing', () => {
    expect(getMidpoint(null, { lat: 30, lng: -97 })).toBeNull();
    expect(getMidpoint({ lat: 30, lng: -97 }, null)).toBeNull();
  });

  it('calculates midpoint between two known points', () => {
    // Austin (30.2672, -97.7431) and San Antonio (29.4241, -98.4936)
    const mid = getMidpoint({ lat: 30.2672, lng: -97.7431 }, { lat: 29.4241, lng: -98.4936 });
    expect(mid.lat).toBeCloseTo(29.846, 1);
    expect(mid.lng).toBeCloseTo(-98.12, 1);
  });

  it('returns same point when both locations are identical', () => {
    const point = { lat: 40.7128, lng: -74.006 };
    const mid = getMidpoint(point, point);
    expect(mid.lat).toBeCloseTo(point.lat, 4);
    expect(mid.lng).toBeCloseTo(point.lng, 4);
  });
});

// ── DISTANCE CALCULATION ─────────────────────────────────────────

describe('getDistanceMiles', () => {
  it('returns 0 for same point', () => {
    const point = { lat: 30.2672, lng: -97.7431 };
    expect(getDistanceMiles(point, point)).toBeCloseTo(0, 1);
  });

  it('calculates Austin to San Antonio correctly (~80 miles)', () => {
    const austin = { lat: 30.2672, lng: -97.7431 };
    const sanAntonio = { lat: 29.4241, lng: -98.4936 };
    const dist = getDistanceMiles(austin, sanAntonio);
    expect(dist).toBeGreaterThan(70);
    expect(dist).toBeLessThan(90);
  });

  it('is symmetric (A to B = B to A)', () => {
    const a = { lat: 30.2672, lng: -97.7431 };
    const b = { lat: 29.4241, lng: -98.4936 };
    expect(getDistanceMiles(a, b)).toBeCloseTo(getDistanceMiles(b, a), 4);
  });
});

// ── VENUE RANKING ────────────────────────────────────────────────

describe('rankVenues', () => {
  const testVenues = [
    createVenue({ name: 'Cheap Cafe', type: 'coffee', cost: '$', rating: 4 }),
    createVenue({ name: 'Fancy Steakhouse', type: 'dinner', cost: '$$$$', rating: 5 }),
    createVenue({ name: 'Dive Bar', type: 'drinks', cost: '$', rating: 3 }),
    createVenue({ name: 'Park', type: 'walk', cost: 'Free', rating: 4 }),
  ];

  it('returns empty array for no venues', () => {
    expect(rankVenues([], {})).toEqual([]);
  });

  it('ranks budget-matching venues higher for broke tier', () => {
    const ranked = rankVenues(testVenues, { budget: 'broke' });
    // Cheap spots should rank higher than the steakhouse
    const cafeIdx = ranked.findIndex(v => v.name === 'Cheap Cafe');
    const steakIdx = ranked.findIndex(v => v.name === 'Fancy Steakhouse');
    expect(cafeIdx).toBeLessThan(steakIdx);
  });

  it('boosts venues matching date type', () => {
    const ranked = rankVenues(testVenues, { dateType: 'coffee' });
    expect(ranked[0].name).toBe('Cheap Cafe');
  });

  it('scores are bounded 0-100', () => {
    const ranked = rankVenues(testVenues, {});
    for (const v of ranked) {
      expect(v.score).toBeGreaterThanOrEqual(0);
      expect(v.score).toBeLessThanOrEqual(100);
    }
  });

  it('returns results sorted by score descending', () => {
    const ranked = rankVenues(testVenues, { budget: 'comfortable' });
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i].score).toBeLessThanOrEqual(ranked[i - 1].score);
    }
  });
});

// ── DATE TYPE SUGGESTIONS ────────────────────────────────────────

describe('suggestDateType', () => {
  it('suggests low-cost dates for broke budget', () => {
    const suggestions = suggestDateType('Prospect', 'broke');
    const ids = suggestions.map(s => s.id);
    expect(ids).not.toContain('dinner');
    expect(ids).not.toContain('event');
  });

  it('suggests appropriate dates for exclusive stage', () => {
    const suggestions = suggestDateType('Exclusive', 'comfortable');
    expect(suggestions.length).toBeLessThanOrEqual(3);
    // Exclusive should include more intimate options
    const ids = suggestions.map(s => s.id);
    expect(ids.some(id => ['dinner', 'home', 'adventure', 'event'].includes(id))).toBe(true);
  });

  it('returns at most 3 suggestions', () => {
    const suggestions = suggestDateType('Dating', 'flush');
    expect(suggestions.length).toBeLessThanOrEqual(3);
  });

  it('each suggestion has required fields', () => {
    const suggestions = suggestDateType('Talking', 'comfortable');
    for (const s of suggestions) {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('label');
      expect(s).toHaveProperty('cost');
      expect(s).toHaveProperty('time');
    }
  });
});

// ── CREATE VENUE ─────────────────────────────────────────────────

describe('createVenue', () => {
  it('creates venue with defaults', () => {
    const v = createVenue();
    expect(v.id).toBeDefined();
    expect(v.type).toBe('drinks');
    expect(v.cost).toBe('$$');
    expect(v.workedBefore).toBe(false);
  });

  it('applies overrides', () => {
    const v = createVenue({ name: 'Test Bar', cost: '$$$' });
    expect(v.name).toBe('Test Bar');
    expect(v.cost).toBe('$$$');
  });
});
