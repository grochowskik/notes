import { describe, it, expect } from 'vitest';
import formatBankAccountNumber from '../formatBankAccountNumber';

describe('formatBankAccountNumber', () => {
  it('formats a 26-digit NRB into XX XXXX XXXX XXXX XXXX XXXX XX groups', () => {
    expect(formatBankAccountNumber('61109010140000071219812874')).toBe(
      '61 1090 1014 0000 0712 1981 2874',
    );
  });

  it('returns empty string for empty input', () => {
    expect(formatBankAccountNumber('')).toBe('');
  });

  it('formats a short account number (groups of 4 after first 2)', () => {
    expect(formatBankAccountNumber('12345678')).toBe('12 3456 78');
  });
});
