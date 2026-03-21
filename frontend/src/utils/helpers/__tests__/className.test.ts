import { describe, expect, it } from 'vitest';
import { cn } from '../className';

describe('cn', () => {
  it('joins multiple class strings', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('filters out falsy values', () => {
    expect(cn(['foo', undefined, 'baz'])).toBe('foo baz');
    expect(cn(['foo', false, 'bar'])).toBe('foo bar');
    expect(cn(['foo', null, 'bar'])).toBe('foo bar');
  });

  it('returns empty string when all values are falsy', () => {
    expect(cn([undefined, false, null])).toBe('');
    expect(cn([])).toBe('');
  });

  it('returns a single class when only one is provided', () => {
    expect(cn(['only-class'])).toBe('only-class');
  });

  it('handles conditional class patterns', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn(['base', isActive && 'active', isDisabled && 'disabled'])).toBe(
      'base active'
    );
  });
});
