import { describe, expect, it } from 'vitest';
import validateBankAccountNumber from '../accountNumber';

const VALID_NRB = '61109010140000071219812874';
const VALID_NRB_FORMATTED = '61 1090 1014 0000 0712 1981 2874';

describe('validateBankAccountNumber', () => {
  it('validates a correct 26-digit NRB', () => {
    expect(validateBankAccountNumber(VALID_NRB)).toBe(true);
  });

  it('validates a correctly formatted NRB with spaces', () => {
    expect(validateBankAccountNumber(VALID_NRB_FORMATTED)).toBe(true);
  });

  it('rejects an empty string', () => {
    expect(validateBankAccountNumber('')).toBe(false);
  });

  it('rejects an NRB with wrong checksum', () => {
    const invalid = '61109010140000071219812873';
    expect(validateBankAccountNumber(invalid)).toBe(false);
  });

  it('rejects an NRB that is not 26 digits', () => {
    expect(validateBankAccountNumber('1234567890')).toBe(false);
    expect(validateBankAccountNumber('123456789012345678901234567')).toBe(
      false
    );
  });

  it('rejects null/undefined-like empty input', () => {
    // @ts-expect-error testing nullish input
    expect(validateBankAccountNumber(null)).toBe(false);
  });
});
