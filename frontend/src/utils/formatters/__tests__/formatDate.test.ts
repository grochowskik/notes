import { describe, it, expect } from 'vitest';
import { formatDate, formatDateForInput } from '../formatDate';
import formatDateRange from '../formatDate';

describe('formatDate', () => {
  it('formats an ISO date string to YYYY-MM-DD HH:mm:ss', () => {
    expect(formatDate('2024-01-15T10:30:00Z')).toBe('2024-01-15 10:30:00');
  });

  it('formats a Unix timestamp string (all digits)', () => {
    expect(formatDate('1705314600000')).toBe('2024-01-15 10:30:00');
  });

  it('pads single-digit month, day, hours, minutes, seconds', () => {
    expect(formatDate('2024-02-05T04:03:01Z')).toBe('2024-02-05 04:03:01');
  });

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(formatDate('')).toBe('');
  });
});

describe('formatDateForInput', () => {
  it('formats a date string for datetime-local input (UTC)', () => {
    const result = formatDateForInput('2024-01-15T10:30:00Z');
    expect(result).toBe('2024-01-15T10:30');
  });

  it('returns undefined for undefined input', () => {
    expect(formatDateForInput(undefined)).toBeUndefined();
  });
});

describe('formatDateRange', () => {
  it('formats both from and to dates', () => {
    expect(formatDateRange({ from: '2024-01-01', to: '2024-01-31' })).toBe(
      'From 2024-01-01 to 2024-01-31',
    );
  });

  it('formats only from date', () => {
    expect(formatDateRange({ from: '2024-01-01' })).toBe('From 2024-01-01');
  });

  it('formats only to date', () => {
    expect(formatDateRange({ to: '2024-01-31' })).toBe('To 2024-01-31');
  });

  it('returns empty string when both are absent', () => {
    expect(formatDateRange({})).toBe('');
  });
});
