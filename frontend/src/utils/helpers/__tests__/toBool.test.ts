import { describe, it, expect } from 'vitest';
import toBool from '../toBool';

describe('toBool', () => {
  it('passes through boolean true/false', () => {
    expect(toBool(true)).toBe(true);
    expect(toBool(false)).toBe(false);
  });

  it('converts number 1 to true and any other number to false', () => {
    expect(toBool(1)).toBe(true);
    expect(toBool(0)).toBe(false);
    expect(toBool(2)).toBe(false);
    expect(toBool(-1)).toBe(false);
  });

  it('converts truthy strings to true (case-insensitive)', () => {
    expect(toBool('yes')).toBe(true);
    expect(toBool('YES')).toBe(true);
    expect(toBool('true')).toBe(true);
    expect(toBool('TRUE')).toBe(true);
    expect(toBool('1')).toBe(true);
  });

  it('converts falsy strings to false', () => {
    expect(toBool('no')).toBe(false);
    expect(toBool('false')).toBe(false);
    expect(toBool('0')).toBe(false);
    expect(toBool('')).toBe(false);
    expect(toBool('maybe')).toBe(false);
  });

  it('trims whitespace from string before comparing', () => {
    expect(toBool('  yes  ')).toBe(true);
    expect(toBool('  true  ')).toBe(true);
  });

  it('returns false for undefined', () => {
    expect(toBool(undefined)).toBe(false);
    expect(toBool()).toBe(false);
  });
});
