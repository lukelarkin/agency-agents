/**
 * Eval Suite: Her Profile Scanner
 * Tests red/green flag detection, chaos rating, photo vibe analysis,
 * and communication strategy generation.
 */

import { describe, it, expect } from 'vitest';
import { scanHerProfile, getChaosRating, getHerCommunicationStrategy, PHOTO_VIBES, RED_FLAGS, GREEN_FLAGS } from '../src/utils/herProfileScanner.js';

// ── PROFILE SCANNING ─────────────────────────────────────────────

describe('scanHerProfile', () => {
  it('detects money solicitation red flag', () => {
    const result = scanHerProfile('Send me money on Venmo lol');
    expect(result.redFlags.some(f => f.severity === 'high')).toBe(true);
    expect(result.redFlags.some(f => f.flag.includes('Money'))).toBe(true);
  });

  it('detects drama mention', () => {
    const result = scanHerProfile('Tired of toxic men and crazy ex drama');
    expect(result.redFlags.some(f => f.flag.includes('drama'))).toBe(true);
  });

  it('detects social media redirect', () => {
    const result = scanHerProfile('Follow me on ig: @herhandle');
    expect(result.redFlags.some(f => f.flag.includes('Social media'))).toBe(true);
  });

  it('detects "no hookups" as info flag', () => {
    const result = scanHerProfile('Looking for something real, no hookups');
    expect(result.redFlags.some(f => f.severity === 'info')).toBe(true);
  });

  it('detects green flags', () => {
    const result = scanHerProfile('Love to cook, currently reading a great book, and just started therapy');
    expect(result.greenFlags.length).toBeGreaterThanOrEqual(3);
    expect(result.greenFlags.some(f => f.flag.includes('Cook'))).toBe(true);
    expect(result.greenFlags.some(f => f.flag.includes('Reader'))).toBe(true);
    expect(result.greenFlags.some(f => f.flag.includes('Self-aware'))).toBe(true);
  });

  it('returns clean results for a neutral profile', () => {
    const result = scanHerProfile('I like sunsets and long walks');
    expect(result.redFlags.length).toBe(0);
  });

  it('handles prompt answers', () => {
    const result = scanHerProfile('Hey', ['I volunteer at the animal shelter', 'My ex was terrible']);
    expect(result.greenFlags.some(f => f.flag.includes('Gives back'))).toBe(true);
  });

  it('classifies effort level correctly', () => {
    expect(scanHerProfile('Hi').effortLevel).toBe('minimal');
    expect(['low', 'medium']).toContain(scanHerProfile('I love hiking and cooking and reading books on the weekends while sipping coffee').effortLevel);
    const longBio = Array(100).fill('interesting').join(' ');
    expect(scanHerProfile(longBio).effortLevel).toBe('high');
  });
});

// ── CHAOS RATING ─────────────────────────────────────────────────

describe('getChaosRating', () => {
  it('returns low chaos for clean profile', () => {
    const result = getChaosRating({
      redFlags: [],
      greenFlags: [{ flag: 'Reader' }, { flag: 'Self-aware' }],
      photoVibe: 'wholesome',
      effortLevel: 'high',
    });
    expect(result.rating).toBeLessThanOrEqual(3);
    expect(result.level).toMatch(/Green/);
  });

  it('returns high chaos for red flag heavy profile', () => {
    const result = getChaosRating({
      redFlags: [
        { severity: 'high' },
        { severity: 'high' },
        { severity: 'medium' },
      ],
      greenFlags: [],
      photoVibe: 'party_girl',
      mentionsDrama: true,
      socialMediaRedirect: true,
    });
    expect(result.rating).toBeGreaterThanOrEqual(7);
    expect(['Orange', 'Red']).toContain(result.level);
  });

  it('green flags reduce chaos', () => {
    const base = {
      redFlags: [{ severity: 'medium' }],
      photoVibe: 'wholesome',
      effortLevel: 'medium',
    };
    const withoutGreen = getChaosRating({ ...base, greenFlags: [] });
    const withGreen = getChaosRating({ ...base, greenFlags: [{ f: 1 }, { f: 2 }, { f: 3 }] });
    expect(withGreen.rating).toBeLessThan(withoutGreen.rating);
  });

  it('rating is clamped between 1 and 10', () => {
    const minCase = getChaosRating({
      redFlags: [], greenFlags: Array(20).fill({}), photoVibe: 'wholesome', effortLevel: 'high',
    });
    expect(minCase.rating).toBeGreaterThanOrEqual(1);

    const maxCase = getChaosRating({
      redFlags: Array(10).fill({ severity: 'high' }),
      greenFlags: [], photoVibe: 'party_girl',
      mentionsDrama: true, socialMediaRedirect: true,
      hasKids: true, age: 20, kidCount: 4,
    });
    expect(maxCase.rating).toBeLessThanOrEqual(10);
  });

  it('includes assessment and advice strings', () => {
    const result = getChaosRating({ redFlags: [], greenFlags: [], photoVibe: 'wholesome' });
    expect(result.assessment).toBeDefined();
    expect(result.advice).toBeDefined();
    expect(result.assessment.length).toBeGreaterThan(10);
  });
});

// ── COMMUNICATION STRATEGY ───────────────────────────────────────

describe('getHerCommunicationStrategy', () => {
  it('returns complete strategy object', () => {
    const scan = scanHerProfile('I love hiking and cooking');
    const chaos = getChaosRating({ redFlags: scan.redFlags, greenFlags: scan.greenFlags, photoVibe: 'adventurous' });
    const strategy = getHerCommunicationStrategy('adventurous', scan, chaos);

    expect(strategy).toHaveProperty('photoStrategy');
    expect(strategy).toHaveProperty('openingAngle');
    expect(strategy).toHaveProperty('toneSuggestion');
    expect(strategy).toHaveProperty('whatSheWants');
    expect(strategy).toHaveProperty('investmentLevel');
  });

  it('recommends low investment for high chaos', () => {
    const scan = scanHerProfile('Send me venmo lol drama queen');
    const chaos = { rating: 8, level: 'Orange', assessment: 'test', advice: 'test' };
    const strategy = getHerCommunicationStrategy('thirst_trap', scan, chaos);
    expect(strategy.investmentLevel).toBe('Minimal until proven');
  });

  it('recommends invest for low chaos', () => {
    const scan = scanHerProfile('Love reading and volunteering');
    const chaos = { rating: 2, level: 'Green', assessment: 'test', advice: 'test' };
    const strategy = getHerCommunicationStrategy('wholesome', scan, chaos);
    expect(strategy.investmentLevel).toBe('Invest');
  });

  it('tailors opening angle to green flags', () => {
    const scan = scanHerProfile('Currently reading a new book');
    const chaos = { rating: 2, level: 'Green', assessment: '', advice: '' };
    const strategy = getHerCommunicationStrategy('artsy', scan, chaos);
    expect(strategy.openingAngle).toContain('reading');
  });
});

// ── PHOTO VIBES ──────────────────────────────────────────────────

describe('PHOTO_VIBES', () => {
  it('has at least 5 vibe types', () => {
    expect(PHOTO_VIBES.length).toBeGreaterThanOrEqual(5);
  });

  it('each vibe has required fields', () => {
    for (const vibe of PHOTO_VIBES) {
      expect(vibe).toHaveProperty('id');
      expect(vibe).toHaveProperty('label');
      expect(vibe).toHaveProperty('strategy');
      expect(vibe.strategy.length).toBeGreaterThan(20);
    }
  });
});
