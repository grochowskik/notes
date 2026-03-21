import { describe, it, expect } from 'vitest';
import validatePhone from '../phone';

describe('validatePhone', () => {
  it('validates a 9-digit phone number', () => {
    expect(validatePhone('123456789')).toBe(true);
  });

  it('validates phone number with country code prefix', () => {
    expect(validatePhone('+48123456789')).toBe(true);
    expect(validatePhone('48123456789')).toBe(true);
  });

  it('validates phone numbers with dashes', () => {
    expect(validatePhone('123-456-789')).toBe(true);
  });

  it('validates 15-character phone number (maximum)', () => {
    expect(validatePhone('123456789012345')).toBe(true);
  });

  it('rejects empty string', () => {
    expect(validatePhone('')).toBe(false);
  });

  it('rejects phone numbers that are too short (< 9 digits)', () => {
    expect(validatePhone('12345678')).toBe(false);
  });

  it('rejects phone numbers that are too long (> 15 chars)', () => {
    expect(validatePhone('1234567890123456')).toBe(false);
  });

  it('rejects phone numbers with letters', () => {
    expect(validatePhone('abc123456')).toBe(false);
    expect(validatePhone('1234abcde')).toBe(false);
  });
});
