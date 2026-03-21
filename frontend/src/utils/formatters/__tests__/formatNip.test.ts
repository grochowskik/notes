import { describe, expect, it } from 'vitest';
import { formatNip } from '../formatNip';

describe('formatNip', () => {
  it('returns a pure-digit NIP unchanged', () => {
    expect(formatNip('5260250274')).toBe('5260250274');
  });

  it('strips the 2-character country code prefix by default', () => {
    expect(formatNip('PL5260250274')).toBe('5260250274');
  });

  it('returns country code + space + NIP when withCountryCode is true', () => {
    expect(formatNip('PL5260250274', true)).toBe('PL 5260250274');
  });

  it('returns only digits when input is digits regardless of withCountryCode flag', () => {
    expect(formatNip('5260250274', true)).toBe('5260250274');
  });
});
