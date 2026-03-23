/**
 * Eval Suite: Profile Grader
 * Tests that the grading engine produces correct scores, grades, and tips
 * for known inputs. Covers photos, bio, prompts, and overall scoring.
 */

import { describe, it, expect } from 'vitest';
import { gradePhotos, gradeBio, gradePrompts, getOverallGrade } from '../src/utils/profileGrader.js';

// ── PHOTO GRADING ────────────────────────────────────────────────

describe('gradePhotos', () => {
  it('returns F grade when nothing is checked', () => {
    const result = gradePhotos({});
    expect(result.score).toBe(0);
    expect(result.grade).toBe('F');
    expect(result.failed.length).toBe(9);
    expect(result.tips.length).toBe(9);
    expect(result.summary).toContain('Emergency');
  });

  it('returns A grade when all criteria are met', () => {
    const allChecked = {
      has_clear_face: true, no_group_first: true, variety: true,
      shows_lifestyle: true, good_lighting: true, no_fish_car_gym: true,
      shows_height_build: true, recent: true, pet_or_social_proof: true,
    };
    const result = gradePhotos(allChecked);
    expect(result.score).toBe(100);
    expect(result.grade).toBe('A');
    expect(result.failed.length).toBe(0);
    expect(result.tips.length).toBe(0);
  });

  it('prioritizes high-weight failures first in tips', () => {
    // Only check the low-weight items
    const result = gradePhotos({ no_fish_car_gym: true, shows_height_build: true, pet_or_social_proof: true });
    // First tips should be weight-3 items (critical)
    expect(result.tips[0].priority).toBe('critical');
  });

  it('returns C-D range for partial completion', () => {
    const partial = { has_clear_face: true, no_group_first: true, good_lighting: true };
    const result = gradePhotos(partial);
    expect(result.score).toBeGreaterThanOrEqual(35);
    expect(result.score).toBeLessThanOrEqual(60);
    expect(['C', 'D']).toContain(result.grade);
  });
});

// ── BIO GRADING ──────────────────────────────────────────────────

describe('gradeBio', () => {
  it('detects "just ask" as a problem', () => {
    const result = gradeBio({}, 'Just ask me anything, I\'m an open book');
    expect(result.textAnalysis.some(a => a.issue.includes('Just ask'))).toBe(true);
  });

  it('detects "no drama" as negativity', () => {
    const result = gradeBio({}, 'No drama queens please, I keep it real');
    expect(result.textAnalysis.some(a => a.issue.includes('Negative filter'))).toBe(true);
  });

  it('flags too-short bios', () => {
    const result = gradeBio({}, 'Hey there');
    expect(result.textAnalysis.some(a => a.issue === 'Too short')).toBe(true);
  });

  it('flags too-long bios', () => {
    const longBio = Array(100).fill('word').join(' ');
    const result = gradeBio({}, longBio);
    expect(result.textAnalysis.some(a => a.issue === 'Too long')).toBe(true);
  });

  it('flags emoji overload', () => {
    const result = gradeBio({}, 'I love life 😂🤣😅💀 so much fun 😂');
    expect(result.textAnalysis.some(a => a.issue === 'Emoji overload')).toBe(true);
  });

  it('returns clean analysis for a good bio', () => {
    const goodBio = 'I once drove four hours for the best tacos in New Mexico. Currently training for a half marathon and learning to make pasta from scratch.';
    const allChecked = {
      has_hook: true, shows_personality: true, not_generic: true,
      no_negativity: true, right_length: true, has_cta: true, no_height_list: true,
    };
    const result = gradeBio(allChecked, goodBio);
    expect(result.grade).toBe('A');
    expect(result.textAnalysis.length).toBe(0);
  });

  it('tracks word count correctly', () => {
    const result = gradeBio({}, 'one two three four five');
    expect(result.wordCount).toBe(5);
  });
});

// ── PROMPT GRADING ───────────────────────────────────────────────

describe('gradePrompts', () => {
  it('detects cliché answers', () => {
    const result = gradePrompts({}, ['The Office', 'Tacos']);
    expect(result.textAnalysis.length).toBeGreaterThanOrEqual(2);
    expect(result.textAnalysis.some(a => a.issue === 'Cliché detected')).toBe(true);
  });

  it('flags too-short answers', () => {
    const result = gradePrompts({}, ['Food']);
    expect(result.textAnalysis.some(a => a.issue.includes('too short'))).toBe(true);
  });

  it('gives A grade when all criteria are met', () => {
    const allChecked = {
      shows_values: true, conversation_starter: true,
      specific_not_vague: true, humor_or_depth: true, not_overused: true,
    };
    const result = gradePrompts(allChecked, ['I build pinball machines on weekends — currently working on a 1970s space theme']);
    expect(result.grade).toBe('A');
  });
});

// ── OVERALL GRADE ────────────────────────────────────────────────

describe('getOverallGrade', () => {
  it('weights photos 50%, bio 30%, prompts 20%', () => {
    // Photos: 100, Bio: 0, Prompts: 0 → 50
    const result = getOverallGrade(100, 0, 0);
    expect(result.score).toBe(50);
  });

  it('returns A for all perfect scores', () => {
    const result = getOverallGrade(100, 100, 100);
    expect(result.grade).toBe('A');
    expect(result.score).toBe(100);
  });

  it('returns F for all zero scores', () => {
    const result = getOverallGrade(0, 0, 0);
    expect(result.grade).toBe('F');
    expect(result.score).toBe(0);
  });

  it('reflects photo dominance in weighting', () => {
    const photosGood = getOverallGrade(90, 50, 50);
    const bioGood = getOverallGrade(50, 90, 50);
    expect(photosGood.score).toBeGreaterThan(bioGood.score);
  });
});
