import { describe, it, expect } from 'vitest';
import { formatPhoneNumber } from '../formatPhoneNumber';

describe('formatPhoneNumber', () => {
  it('returns phone unchanged when no area code is provided', () => {
    expect(formatPhoneNumber('+48123456789')).toBe('+48123456789');
    expect(formatPhoneNumber('123456789')).toBe('123456789');
  });

  it('prepends area code with space when phone already includes it', () => {
    expect(formatPhoneNumber('+48123456789', '+48')).toBe('+48 123456789');
  });

  it('prepends area code with space when phone does NOT include it', () => {
    expect(formatPhoneNumber('123456789', '+48')).toBe('+48 123456789');
  });

  it('handles area code of 0 (falsy) as no-code', () => {
    expect(formatPhoneNumber('123456789', '')).toBe('123456789');
  });
});
