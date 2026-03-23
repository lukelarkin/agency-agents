/**
 * Profile Grading Engine
 * Scores dating app photos, bios, and prompts with specific, actionable feedback.
 */

import { PHOTO_CRITERIA, BIO_CRITERIA, PROMPT_CRITERIA } from '../models/schemas.js';

/**
 * Grade a set of photos based on checked criteria.
 * @param {Object} checkedCriteria - { criteriaId: boolean }
 * @returns {Object} { score, grade, passed, failed, tips }
 */
export function gradePhotos(checkedCriteria) {
  let earned = 0;
  let total = 0;
  const passed = [];
  const failed = [];

  for (const c of PHOTO_CRITERIA) {
    total += c.weight;
    if (checkedCriteria[c.id]) {
      earned += c.weight;
      passed.push(c);
    } else {
      failed.push(c);
    }
  }

  const score = Math.round((earned / total) * 100);
  const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';

  // Prioritized tips (highest weight failures first)
  const tips = failed
    .sort((a, b) => b.weight - a.weight)
    .map(c => ({ label: c.label, tip: c.tip, priority: c.weight >= 3 ? 'critical' : c.weight >= 2 ? 'important' : 'nice-to-have' }));

  return {
    score,
    grade,
    passed: passed.map(c => c.label),
    failed: failed.map(c => c.label),
    tips,
    summary: getPhotoSummary(score, failed),
  };
}

function getPhotoSummary(score, failed) {
  if (score >= 85) return 'Your photos are strong. You\'re not losing matches here. Fine-tune if you want, but focus energy on your bio and texts.';
  if (score >= 70) return 'Solid foundation but there are clear upgrades. Fix the top priority items and you\'ll see more right-swipes this week.';
  if (score >= 55) return 'Your photos are hurting you. You might be getting left-swiped by women who would actually like you in person. Fix the critical items first.';
  if (score >= 40) return 'Major overhaul needed. Your photos are actively working against you. Start fresh — one good photo session changes everything.';
  return 'Emergency. Your photos need to be replaced entirely. Get a friend with an iPhone, go outside in good light, and reshoot everything this weekend.';
}

/**
 * Grade a bio/about me section.
 * @param {Object} checkedCriteria - { criteriaId: boolean }
 * @param {string} bioText - The actual bio text for analysis
 * @returns {Object}
 */
export function gradeBio(checkedCriteria, bioText = '') {
  let earned = 0;
  let total = 0;
  const passed = [];
  const failed = [];

  for (const c of BIO_CRITERIA) {
    total += c.weight;
    if (checkedCriteria[c.id]) {
      earned += c.weight;
      passed.push(c);
    } else {
      failed.push(c);
    }
  }

  const score = Math.round((earned / total) * 100);
  const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';

  // Text analysis
  const wordCount = bioText.trim().split(/\s+/).filter(Boolean).length;
  const textAnalysis = [];
  if (wordCount > 0) {
    if (wordCount < 10) textAnalysis.push({ issue: 'Too short', tip: 'Your bio is only ' + wordCount + ' words. Aim for 20-40 words. Give her something to work with.' });
    if (wordCount > 80) textAnalysis.push({ issue: 'Too long', tip: 'Your bio is ' + wordCount + ' words. Cut it to 40 max. She\'s not reading your memoir.' });
    if (bioText.includes('just ask') || bioText.includes('Just ask')) textAnalysis.push({ issue: '"Just ask" detected', tip: 'Delete this immediately. It says "I\'m too lazy to be interesting upfront." She won\'t ask. She\'ll swipe.' });
    if (bioText.includes('no drama') || bioText.includes('No drama')) textAnalysis.push({ issue: 'Negative filter detected', tip: '"No drama" screams "I cause drama." Remove all negative language. Advertise what you offer, not what you don\'t want.' });
    if ((bioText.match(/[😂🤣😅💀]/g) || []).length > 3) textAnalysis.push({ issue: 'Emoji overload', tip: 'More than 2-3 emojis in a bio looks juvenile. One or two for flavor. Let your words be the personality.' });
    if (/\b(6'[0-9]|5'[0-9])\b/.test(bioText) && wordCount < 15) textAnalysis.push({ issue: 'Stats-heavy bio', tip: 'Leading with height is fine but don\'t make your whole bio a spec sheet. Add personality.' });
    if (/\b(the office|tacos?|dogs?|adventure)\b/i.test(bioText) && wordCount < 20) textAnalysis.push({ issue: 'Cliché alert', tip: 'Every other bio mentions The Office and tacos. Find your unique angle. What makes YOU different?' });
  }

  const tips = failed
    .sort((a, b) => b.weight - a.weight)
    .map(c => ({ label: c.label, tip: c.tip, priority: c.weight >= 3 ? 'critical' : c.weight >= 2 ? 'important' : 'nice-to-have' }));

  return {
    score,
    grade,
    passed: passed.map(c => c.label),
    failed: failed.map(c => c.label),
    tips,
    textAnalysis,
    wordCount,
    summary: getBioSummary(score),
  };
}

function getBioSummary(score) {
  if (score >= 85) return 'Your bio is doing its job. It\'s interesting, specific, and gives her a reason to swipe right and something to open with.';
  if (score >= 70) return 'Good energy but missing some elements. The tips below will tighten it up.';
  if (score >= 55) return 'Your bio is forgettable. She reads 50 bios in a session — yours needs to stick. Focus on the critical fixes.';
  return 'Your bio is either too generic, too negative, or too empty. Rewrite it from scratch using the tips below.';
}

/**
 * Grade prompt answers.
 * @param {Object} checkedCriteria
 * @param {Array<string>} promptTexts - The actual prompt answers
 * @returns {Object}
 */
export function gradePrompts(checkedCriteria, promptTexts = []) {
  let earned = 0;
  let total = 0;
  const passed = [];
  const failed = [];

  for (const c of PROMPT_CRITERIA) {
    total += c.weight;
    if (checkedCriteria[c.id]) {
      earned += c.weight;
      passed.push(c);
    } else {
      failed.push(c);
    }
  }

  const score = Math.round((earned / total) * 100);
  const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';

  // Prompt text analysis
  const textAnalysis = [];
  for (const pt of promptTexts) {
    if (pt.length < 15) textAnalysis.push({ issue: 'Prompt answer too short', text: pt, tip: 'One-word or ultra-short prompt answers waste the space. Use it to show personality.' });
    if (/\b(the office|tacos?|pizza|dogs?|naps?)\b/i.test(pt)) textAnalysis.push({ issue: 'Cliché detected', text: pt, tip: 'This answer has been written by millions. Find something that only YOU would say.' });
  }

  const tips = failed
    .sort((a, b) => b.weight - a.weight)
    .map(c => ({ label: c.label, tip: c.tip, priority: c.weight >= 3 ? 'critical' : 'important' }));

  return {
    score,
    grade,
    passed: passed.map(c => c.label),
    tips,
    textAnalysis,
    summary: score >= 70 ? 'Your prompts are working for you. They show personality and give her openings.' :
             score >= 50 ? 'Your prompts need work. They should be mini-conversations, not filler.' :
             'Your prompts are forgettable or cliché. Rewrite them with the tips below.',
  };
}

/**
 * Get overall profile grade.
 */
export function getOverallGrade(photoScore, bioScore, promptScore) {
  // Photos weighted heaviest (50%), then bio (30%), then prompts (20%)
  const weighted = (photoScore * 0.5) + (bioScore * 0.3) + (promptScore * 0.2);
  const score = Math.round(weighted);
  const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';

  let verdict = '';
  if (score >= 85) verdict = 'Your profile is a weapon. You\'re converting attention into matches. Focus on your texting game now.';
  else if (score >= 70) verdict = 'Strong profile with room to optimize. Small fixes here could mean 30%+ more matches.';
  else if (score >= 55) verdict = 'Your profile is losing you matches. Women who\'d like you in person are swiping left based on this. Fix the critical items.';
  else if (score >= 40) verdict = 'Major upgrade needed. Your profile isn\'t representing you well. Prioritize photos first, then bio.';
  else verdict = 'Starting from scratch would be faster than fixing what\'s here. Dedicate one afternoon to rebuilding your entire profile.';

  return { score, grade, verdict };
}
