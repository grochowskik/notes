import { describe, it, expect } from 'vitest';
import sanitizeAmount from '../sanitizeAmount';

describe('sanitizeAmount', () => {
  it('parses a plain integer string', () => {
    expect(sanitizeAmount('100')).toBe(100);
  });

  it('parses a decimal string with a dot', () => {
    expect(sanitizeAmount('1000.50')).toBe(1000.5);
  });

  it('parses a decimal string with a comma (Polish locale)', () => {
    expect(sanitizeAmount('1000,50')).toBe(1000.5);
  });

  it('strips spaces (thousands separator)', () => {
    expect(sanitizeAmount('1 000')).toBe(1000);
    expect(sanitizeAmount('1 000,50')).toBe(1000.5);
  });

  it('returns 0 for empty string', () => {
    expect(sanitizeAmount('')).toBe(0);
  });

  it('returns integer * 100 when asInt is true', () => {
    expect(sanitizeAmount('100', true)).toBe(10000);
    expect(sanitizeAmount('1000.50', true)).toBe(100050);
  });

  it('returns NaN for non-numeric string', () => {
    expect(sanitizeAmount('abc')).toBeNaN();
  });
});
