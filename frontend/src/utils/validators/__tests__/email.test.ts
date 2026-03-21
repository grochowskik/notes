import { describe, expect, it } from 'vitest';
import validateEmail from '../email';

describe('validateEmail', () => {
  it('validates standard email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user@domain.org')).toBe(true);
    expect(validateEmail('user@sub.domain.co.uk')).toBe(true);
  });

  it('validates emails with special local-part characters', () => {
    expect(validateEmail('user.name@domain.com')).toBe(true);
    expect(validateEmail('user+tag@domain.com')).toBe(true);
    expect(validateEmail('user_name@domain.io')).toBe(true);
    expect(validateEmail('user-name@domain.net')).toBe(true);
  });

  it('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('rejects missing @ symbol', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('rejects missing local part', () => {
    expect(validateEmail('@domain.com')).toBe(false);
  });

  it('rejects missing domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('rejects missing TLD', () => {
    expect(validateEmail('user@domain')).toBe(false);
  });

  it('rejects spaces in email', () => {
    expect(validateEmail('user @domain.com')).toBe(false);
    expect(validateEmail('user@ domain.com')).toBe(false);
  });

  it('rejects double dots in domain', () => {
    expect(validateEmail('user@domain..com')).toBe(false);
  });

  it('rejects dot at start of domain', () => {
    expect(validateEmail('user@.domain.com')).toBe(false);
  });
});
