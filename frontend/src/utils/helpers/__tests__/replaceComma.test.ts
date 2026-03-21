import { describe, it, expect } from 'vitest';
import { replaceComma, replaceDot } from '../replaceComma';

describe('replaceComma', () => {
  it('replaces comma with dot in a string', () => {
    expect(replaceComma('1,5')).toBe('1.5');
  });

  it('returns the string unchanged when no comma is present', () => {
    expect(replaceComma('1.5')).toBe('1.5');
  });

  it('converts a number to string', () => {
    expect(replaceComma(1.5)).toBe('1.5');
  });

  it('only replaces the first comma', () => {
    expect(replaceComma('1,234,567')).toBe('1.234,567');
  });

  it('handles empty string', () => {
    expect(replaceComma('')).toBe('');
  });

  it('passes null through unchanged', () => {
    // @ts-expect-error testing null
    expect(replaceComma(null)).toBeNull();
  });
});

describe('replaceDot', () => {
  it('replaces dot with comma in a string', () => {
    expect(replaceDot('1.5')).toBe('1,5');
  });

  it('converts a number to string and replaces dot', () => {
    expect(replaceDot(1.5)).toBe('1,5');
  });

  it('returns falsy values unchanged', () => {
    expect(replaceDot('')).toBe('');
    expect(replaceDot(0)).toBe(0);
    // @ts-expect-error testing undefined
    expect(replaceDot(undefined)).toBeUndefined();
  });
});
