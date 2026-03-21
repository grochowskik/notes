import { describe, expect, it } from 'vitest';
import validateRegon from '../regon';

const VALID_REGON_9 = '123456785';
const VALID_REGON_14 = '12345678901235';

describe('validateRegon', () => {
  it('validates a correct 9-digit REGON', () => {
    expect(validateRegon(VALID_REGON_9)).toBe(true);
  });

  it('validates a correct 14-digit REGON', () => {
    expect(validateRegon(VALID_REGON_14)).toBe(true);
  });

  it('rejects a 9-digit REGON with wrong checksum', () => {
    expect(validateRegon('123456784')).toBe(false);
  });

  it('rejects a 14-digit REGON with wrong checksum', () => {
    expect(validateRegon('12345678901236')).toBe(false);
  });

  it('rejects REGON with wrong length (8 digits)', () => {
    expect(validateRegon('12345678')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(validateRegon('')).toBe(false);
  });

  it('rejects REGON with letters', () => {
    expect(validateRegon('12345678A')).toBe(false);
  });

  it('uses 9-digit logic when last 5 digits are all zeros', () => {
    const regon14WithZeros = '12345678500000';
    expect(validateRegon(regon14WithZeros)).toBe(true);
  });
});
