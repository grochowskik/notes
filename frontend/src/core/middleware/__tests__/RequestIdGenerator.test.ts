import { describe, it, expect } from 'vitest';
import RequestIdGenerator from '../RequestIdGenerator';

describe('RequestIdGenerator', () => {
  it('generates a non-empty string', () => {
    const id = RequestIdGenerator.generate();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('generates unique IDs on consecutive calls', () => {
    const ids = new Set(
      Array.from({ length: 100 }, () => RequestIdGenerator.generate()),
    );
    expect(ids.size).toBe(100);
  });

  it('ID contains the expected prefix pattern (web- or ssr-)', () => {
    const id = RequestIdGenerator.generate();
    expect(id).toMatch(/^(web|ssr)-\d+-\d+$/);
  });

  it('counter wraps at 100000 (stays numeric)', () => {
    for (let i = 0; i < 200; i++) {
      const id = RequestIdGenerator.generate();
      expect(id).toMatch(/^(web|ssr)-\d+-\d+$/);
    }
  });
});
