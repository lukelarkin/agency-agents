/**
 * GAP 3: STRUCTURED OUTPUTS — Runtime validation for profile data.
 * Ensures all data flowing through the app meets strict schemas.
 * Acts as the "treatment plan template" — nothing gets saved without validation.
 */

import {
  ZODIAC_SIGNS, ATTACHMENT_STYLES, BIRTH_CONTROL_TYPES,
  RELATIONSHIP_STAGES, LOVE_LANGUAGES, INTEREST_CATEGORIES,
  FAMILY_DYNAMICS, VALUES,
} from '../models/schemas.js';

class ValidationError extends Error {
  constructor(field, message) {
    super(`${field}: ${message}`);
    this.field = field;
  }
}

/**
 * Validate a profile object. Returns { valid, errors }.
 */
export function validateProfile(profile) {
  const errors = [];

  // Required fields
  if (!profile.name || typeof profile.name !== 'string' || profile.name.trim().length === 0) {
    errors.push(new ValidationError('name', 'Name is required'));
  }

  if (profile.age !== null && profile.age !== undefined) {
    const age = Number(profile.age);
    if (!Number.isInteger(age) || age < 18 || age > 100) {
      errors.push(new ValidationError('age', 'Age must be an integer between 18 and 100'));
    }
  }

  if (profile.zodiacSign && !ZODIAC_SIGNS.includes(profile.zodiacSign)) {
    errors.push(new ValidationError('zodiacSign', `Must be one of: ${ZODIAC_SIGNS.join(', ')}`));
  }

  if (profile.attachmentStyle && !ATTACHMENT_STYLES.map(a => a.id).includes(profile.attachmentStyle)) {
    errors.push(new ValidationError('attachmentStyle', 'Invalid attachment style'));
  }

  if (profile.birthControl && !BIRTH_CONTROL_TYPES.includes(profile.birthControl)) {
    errors.push(new ValidationError('birthControl', 'Invalid birth control type'));
  }

  if (profile.relationshipStage && !RELATIONSHIP_STAGES.includes(profile.relationshipStage)) {
    errors.push(new ValidationError('relationshipStage', 'Invalid relationship stage'));
  }

  if (profile.cycleLength !== undefined) {
    const cl = Number(profile.cycleLength);
    if (!Number.isInteger(cl) || cl < 20 || cl > 45) {
      errors.push(new ValidationError('cycleLength', 'Cycle length must be between 20 and 45 days'));
    }
  }

  // Array fields: validate each item is from allowed set
  if (profile.loveLanguages?.length) {
    for (const ll of profile.loveLanguages) {
      if (!LOVE_LANGUAGES.includes(ll)) {
        errors.push(new ValidationError('loveLanguages', `Invalid love language: ${ll}`));
      }
    }
    if (profile.loveLanguages.length > 3) {
      errors.push(new ValidationError('loveLanguages', 'Max 3 love languages'));
    }
  }

  if (profile.interests?.length) {
    for (const i of profile.interests) {
      if (!INTEREST_CATEGORIES.includes(i)) {
        errors.push(new ValidationError('interests', `Invalid interest: ${i}`));
      }
    }
  }

  if (profile.values?.length) {
    for (const v of profile.values) {
      if (!VALUES.includes(v)) {
        errors.push(new ValidationError('values', `Invalid value: ${v}`));
      }
    }
  }

  if (profile.familyDynamics?.length) {
    for (const fd of profile.familyDynamics) {
      if (!FAMILY_DYNAMICS.includes(fd)) {
        errors.push(new ValidationError('familyDynamics', `Invalid family dynamic: ${fd}`));
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate a date log entry.
 */
export function validateDateEntry(entry) {
  const errors = [];

  if (!entry.date) {
    errors.push(new ValidationError('date', 'Date is required'));
  }

  if (entry.howItWent !== undefined) {
    const rating = Number(entry.howItWent);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      errors.push(new ValidationError('howItWent', 'Rating must be 1-5'));
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Structured output schema definition (for future API integration).
 * This mirrors Pydantic's BaseModel pattern for JS.
 */
export const PROFILE_SCHEMA = {
  type: 'object',
  required: ['name', 'relationshipStage'],
  properties: {
    name: { type: 'string', minLength: 1 },
    nickname: { type: 'string' },
    age: { type: 'integer', minimum: 18, maximum: 100 },
    zodiacSign: { type: 'string', enum: ZODIAC_SIGNS },
    attachmentStyle: { type: 'string', enum: ATTACHMENT_STYLES.map(a => a.id) },
    loveLanguages: { type: 'array', items: { type: 'string', enum: LOVE_LANGUAGES }, maxItems: 3 },
    birthControl: { type: 'string', enum: BIRTH_CONTROL_TYPES },
    cycleLength: { type: 'integer', minimum: 20, maximum: 45 },
    interests: { type: 'array', items: { type: 'string', enum: INTEREST_CATEGORIES } },
    values: { type: 'array', items: { type: 'string', enum: VALUES } },
    familyDynamics: { type: 'array', items: { type: 'string', enum: FAMILY_DYNAMICS } },
    relationshipStage: { type: 'string', enum: RELATIONSHIP_STAGES },
  },
};
