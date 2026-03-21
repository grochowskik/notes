import { describe, it, expect } from 'vitest';
import formatCardNumber from '../formatCardNumber';

describe('formatCardNumber', () => {
  it('formats a 16-digit card number into 4-5-5-2 groups', () => {
    expect(formatCardNumber('4532015112830366')).toBe('4532 01511 28303 66');
  });

  it('accepts a numeric argument', () => {
    expect(formatCardNumber(4532015112830366)).toBe('4532 01511 28303 66');
  });

  it('returns the number unchanged if it does not match the regex pattern', () => {
    expect(formatCardNumber('1234')).toBe('1234');
  });

  it('returns empty string for non-numeric string', () => {
    expect(formatCardNumber('not-a-number')).toBe('');
    expect(formatCardNumber('abcdefghijklmnop')).toBe('');
  });
});
