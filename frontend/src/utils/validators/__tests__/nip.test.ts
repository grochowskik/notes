import { describe, expect, it } from 'vitest';
import validateNip from '../nip';

const VALID_NIP = '5260250274';
const VALID_NIP_DASHED = '526-02-50-274';

describe('validateNip', () => {
  it('validates a correct 10-digit NIP', () => {
    expect(validateNip(VALID_NIP)).toBe(true);
  });

  it('validates a correctly formatted NIP with dashes', () => {
    expect(validateNip(VALID_NIP_DASHED)).toBe(true);
  });

  it('rejects a NIP with wrong checksum digit', () => {
    expect(validateNip('5260250273')).toBe(false);
  });

  it('rejects a NIP with wrong format', () => {
    expect(validateNip('12345')).toBe(false);
    expect(validateNip('12345678901')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(validateNip('')).toBe(false);
  });

  it('rejects NIP with letters', () => {
    expect(validateNip('52602502AB')).toBe(false);
  });

  it('rejects a NIP with invalid dash format', () => {
    expect(validateNip('526-025-0274')).toBe(false);
  });
});
