import { describe, expect, it } from 'vitest';
import validatePesel from '../pesel';

const VALID_PESEL = '44051401458';
const VALID_PESEL_2 = '92071314764';

describe('validatePesel', () => {
  it('validates a correct PESEL string', () => {
    expect(validatePesel(VALID_PESEL)).toBe(true);
  });

  it('validates a second correct PESEL', () => {
    expect(validatePesel(VALID_PESEL_2)).toBe(true);
  });

  it('accepts numeric PESEL input', () => {
    expect(validatePesel(44051401458)).toBe(true);
  });

  it('rejects a PESEL with wrong checksum digit', () => {
    expect(validatePesel('44051401459')).toBe(false);
  });

  it('rejects a PESEL with wrong length (10 digits)', () => {
    expect(validatePesel('1234567890')).toBe(false);
  });

  it('rejects a PESEL with wrong length (12 digits)', () => {
    expect(validatePesel('440514014580')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(validatePesel('')).toBe(false);
  });
});
