import { describe, it, expect } from 'vitest';
import formatAmountValue, {
  formatCentAmount,
  formatPercentage,
} from '../formatAmountValue';

describe('formatAmountValue', () => {
  it('formats a plain number without currency', () => {
    expect(formatAmountValue(1000)).toBe('1 000,00');
  });

  it('formats a number with currency (non-breaking space separator)', () => {
    expect(formatAmountValue(1000, 'PLN')).toBe('1 000,00\u00A0PLN');
  });

  it('formats decimal values correctly', () => {
    expect(formatAmountValue(1000.5, 'PLN')).toBe('1 000,50\u00A0PLN');
    expect(formatAmountValue(1234567.89, 'EUR')).toBe('1 234 567,89\u00A0EUR');
  });

  it('formats zero correctly', () => {
    expect(formatAmountValue(0)).toBe('0,00');
  });

  it('accepts string number with comma as decimal separator', () => {
    expect(formatAmountValue('1,5')).toBe('1,50');
  });

  it('respects custom precision', () => {
    expect(formatAmountValue(100, undefined, 0)).toBe('100');
    expect(formatAmountValue(1.555, 'PLN', 3)).toBe('1,555\u00A0PLN');
  });

  it('returns empty string for undefined, null, and empty string', () => {
    expect(formatAmountValue(undefined)).toBe('');
    expect(formatAmountValue('')).toBe('');
    // @ts-expect-error testing null
    expect(formatAmountValue(null)).toBe('');
  });

  it('returns empty string for non-numeric string', () => {
    expect(formatAmountValue('abc')).toBe('');
    expect(formatAmountValue('NaN')).toBe('');
  });
});

describe('formatCentAmount', () => {
  it('converts cent amount to decimal string', () => {
    expect(formatCentAmount(100)).toBe('1,00');
    expect(formatCentAmount(50)).toBe('0,50');
    expect(formatCentAmount(1000)).toBe('10,00');
    expect(formatCentAmount(0)).toBe('0,00');
  });

  it('returns empty string for NaN input', () => {
    expect(formatCentAmount('abc')).toBe('');
  });
});

describe('formatPercentage', () => {
  it('formats a number as percentage', () => {
    expect(formatPercentage(5)).toBe('5,00%');
    expect(formatPercentage(0.5)).toBe('0,50%');
    expect(formatPercentage(100)).toBe('100,00%');
  });

  it('returns empty string for non-numeric input', () => {
    expect(formatPercentage('abc')).toBe('');
  });
});
