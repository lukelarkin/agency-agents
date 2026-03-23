import { differenceInDays, addDays, format } from 'date-fns';
import { CYCLE_PHASES } from '../models/schemas.js';

/**
 * Calculate current cycle day and phase from last period start.
 */
export function getCycleInfo(lastPeriodStart, cycleLength = 28) {
  if (!lastPeriodStart) return null;

  const start = new Date(lastPeriodStart);
  const today = new Date();
  const totalDays = differenceInDays(today, start);
  const cycleDay = (totalDays % cycleLength) + 1;

  let phase;
  if (cycleDay <= 5) phase = CYCLE_PHASES[0]; // menstrual
  else if (cycleDay <= 13) phase = CYCLE_PHASES[1]; // follicular
  else if (cycleDay <= 16) phase = CYCLE_PHASES[2]; // ovulatory
  else phase = CYCLE_PHASES[3]; // luteal

  const daysLeftInPhase = phase.id === 'menstrual' ? 5 - cycleDay
    : phase.id === 'follicular' ? 13 - cycleDay
    : phase.id === 'ovulatory' ? 16 - cycleDay
    : cycleLength - cycleDay;

  const nextPeriod = addDays(start, Math.ceil(totalDays / cycleLength) * cycleLength);

  return {
    cycleDay,
    phase,
    daysLeftInPhase: Math.max(0, daysLeftInPhase),
    nextPeriodDate: format(nextPeriod, 'MMM d'),
    fertile: cycleDay >= 11 && cycleDay <= 17,
  };
}

/**
 * Get scheduling recommendation based on cycle phase.
 */
export function getDateRecommendation(phase) {
  const recs = {
    menstrual: {
      ideal: 'Cozy night in, comfort food, movie night',
      texting: 'Be warm and low-pressure. She may want space.',
      energy: 'low',
      tip: 'This is not the time to push for big plans. Comfort wins.',
    },
    follicular: {
      ideal: 'Active date — try something new, adventurous',
      texting: 'She\'s more open and social now. Good time to initiate.',
      energy: 'rising',
      tip: 'Her energy is building. Match it with enthusiasm.',
    },
    ovulatory: {
      ideal: 'Social events, dinners out, high-energy dates',
      texting: 'She\'s at peak confidence. Be direct, playful, bold.',
      energy: 'peak',
      tip: 'Peak attraction window. Make your move.',
    },
    luteal: {
      ideal: 'Intimate settings, quality time, thoughtful gestures',
      texting: 'Be reassuring and consistent. Avoid mixed signals.',
      energy: 'declining',
      tip: 'She may be more sensitive. Words of affirmation go far.',
    },
  };
  return recs[phase?.id] || recs.follicular;
}
