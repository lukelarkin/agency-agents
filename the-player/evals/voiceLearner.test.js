/**
 * Eval Suite: Voice Learner
 * Tests voice analysis pattern extraction, transformation, and description.
 */

import { describe, it, expect } from 'vitest';
import { analyzeVoice, describeVoice, transformToVoice } from '../src/utils/voiceLearner.js';

// ── VOICE ANALYSIS ───────────────────────────────────────────────

describe('analyzeVoice', () => {
  it('returns default voice for empty samples', () => {
    const voice = analyzeVoice([]);
    expect(voice.sampleCount).toBe(0);
    expect(voice.lengthStyle).toBe('concise');
  });

  it('detects terse style from short messages', () => {
    const samples = ['yo', 'bet', 'haha nah', 'word', 'cool'];
    const voice = analyzeVoice(samples);
    expect(voice.lengthStyle).toBe('terse');
    expect(voice.avgLength).toBeLessThanOrEqual(3);
  });

  it('detects conversational style from medium messages', () => {
    const samples = [
      'hey how was your weekend did you do anything fun',
      'yeah that sounds like a good time honestly',
      'we should grab coffee sometime this week if you are free',
    ];
    const voice = analyzeVoice(samples);
    expect(['conversational', 'concise']).toContain(voice.lengthStyle);
  });

  it('detects emoji-heavy usage', () => {
    const samples = [
      'omg that is so funny 😂😂',
      'you are literally the best 🔥❤️',
      'hahaha no way 💀😭🤣',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.emojiStyle).toBe('emoji-heavy');
    expect(voice.emojiRate).toBeGreaterThan(1);
  });

  it('detects no-emoji usage', () => {
    const samples = [
      'that is pretty cool actually',
      'what are you doing this weekend',
      'nice i will let you know',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.emojiStyle).toBe('no-emoji');
  });

  it('detects lowercase style', () => {
    const samples = [
      'hey whats up',
      'nothing much just chilling',
      'yeah that sounds good',
      'cool lets do it',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.capsStyle).toBe('lowercase');
  });

  it('detects very-casual formality from slang', () => {
    const samples = [
      'lol nah tbh i dont really care',
      'bruh thats lowkey hilarious ngl',
      'gonna be late wanna grab food after',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.formalityLevel).toBe('very-casual');
  });

  it('detects nickname usage', () => {
    const samples = [
      'hey babe how are you',
      'miss you babe',
      'goodnight babe',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.usesNicknames).toBe(true);
    expect(voice.favoriteNickname).toBe('babe');
  });

  it('detects question tendency', () => {
    const samples = [
      'how was your day?',
      'what are you up to tonight?',
      'have you been to that new place?',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.asksQuestions).toBe(true);
  });

  it('extracts signature phrases from repetition', () => {
    const samples = [
      'for real though that was wild',
      'for real though i didnt expect that',
      'for real though she said what',
      'thats crazy but for real though',
    ];
    const voice = analyzeVoice(samples);
    expect(voice.signaturePhrases).toContain('for real');
  });
});

// ── VOICE DESCRIPTION ────────────────────────────────────────────

describe('describeVoice', () => {
  it('returns prompt for empty samples', () => {
    const desc = describeVoice({ sampleCount: 0 });
    expect(desc).toContain('No writing samples');
  });

  it('produces readable description for analyzed voice', () => {
    const voice = analyzeVoice([
      'yo whats good',
      'nah thats wild lol',
      'bet lets do it',
    ]);
    const desc = describeVoice(voice);
    expect(desc.length).toBeGreaterThan(20);
    expect(typeof desc).toBe('string');
  });
});

// ── VOICE TRANSFORMATION ────────────────────────────────────────

describe('transformToVoice', () => {
  it('returns original text for empty voice', () => {
    const result = transformToVoice('Hello there.', { sampleCount: 0 });
    expect(result).toBe('Hello there.');
  });

  it('lowercases first letter for lowercase style', () => {
    const voice = { sampleCount: 10, capsStyle: 'lowercase', emojiStyle: 'some-emoji', punctStyle: 'standard', formalityLevel: 'casual', lengthStyle: 'concise', usesNicknames: false };
    const result = transformToVoice('Hey there', voice);
    expect(result[0]).toBe('h');
  });

  it('strips emojis for no-emoji style', () => {
    const voice = { sampleCount: 10, capsStyle: 'normal-caps', emojiStyle: 'no-emoji', punctStyle: 'standard', formalityLevel: 'casual', lengthStyle: 'concise', usesNicknames: false };
    const result = transformToVoice('Hey there 🔥', voice);
    expect(result).not.toContain('🔥');
  });

  it('removes trailing punctuation for no-punctuation style', () => {
    const voice = { sampleCount: 10, capsStyle: 'normal-caps', emojiStyle: 'some-emoji', punctStyle: 'no-punctuation', formalityLevel: 'casual', lengthStyle: 'concise', usesNicknames: false };
    const result = transformToVoice('Hey there.', voice);
    expect(result).not.toMatch(/\.$/);
  });

  it('converts to contractions for very-casual style', () => {
    const voice = { sampleCount: 10, capsStyle: 'normal-caps', emojiStyle: 'some-emoji', punctStyle: 'standard', formalityLevel: 'very-casual', lengthStyle: 'concise', usesNicknames: false };
    const result = transformToVoice('I am going to want to hang out', voice);
    expect(result).toContain('gonna');
    expect(result).toContain('wanna');
  });
});
