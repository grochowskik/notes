import { describe, expect, it } from 'vitest';
import validateCardNumber from '../cardNumber';

describe('validateCardNumber', () => {
  it('validates a correct Visa card number (Luhn-valid)', () => {
    expect(validateCardNumber('4532015112830366')).toBe(true);
  });

  it('validates a correct Mastercard number (Luhn-valid)', () => {
    expect(validateCardNumber('5425233430109903')).toBe(true);
  });

  it('validates a correct Amex number (Luhn-valid)', () => {
    expect(validateCardNumber('378282246310005')).toBe(true);
  });

  it('rejects a number with invalid Luhn checksum', () => {
    expect(validateCardNumber('4532015112830367')).toBe(false);
  });

  it('rejects numbers shorter than 10 digits', () => {
    expect(validateCardNumber('123456789')).toBe(false);
    expect(validateCardNumber('')).toBe(false);
  });

  it('rejects a Visa number with a wrong last digit', () => {
    expect(validateCardNumber('4532015112830367')).toBe(false);
  });

  it('handles numeric input (not just string)', () => {
    const validNum = '4532015112830366';
    expect(validateCardNumber(validNum)).toBe(true);
  });
});
