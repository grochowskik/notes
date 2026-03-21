import { describe, it, expect, beforeEach, vi } from 'vitest';
import SessionManager from '../SessionManager';
import type { SessionData, StorageAdapter } from '../types';

function makeStorage(): StorageAdapter & { store: Record<string, string> } {
  const store: Record<string, string> = {};
  return {
    store,
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
  };
}

const validSession: SessionData = {
  is_user_logged_in: true,
  sid: 'session-abc',
  csrf_token: 'token-xyz',
};

describe('SessionManager', () => {
  let storage: ReturnType<typeof makeStorage>;
  let manager: SessionManager;

  beforeEach(() => {
    storage = makeStorage();
    manager = new SessionManager(storage);
  });

  describe('saveSession', () => {
    it('serialises and stores the session', () => {
      manager.saveSession(validSession);
      const raw = storage.getItem('session');
      expect(raw).not.toBeNull();
      const parsed = JSON.parse(raw!);
      expect(parsed.sid).toBe('session-abc');
      expect(parsed.csrf_token).toBe('token-xyz');
      expect(parsed.is_user_logged_in).toBe(true);
    });

    it('only stores the three canonical fields (no extra data)', () => {
      const extended = { ...validSession, extra: 'should-be-ignored' } as SessionData;
      manager.saveSession(extended);
      const parsed = JSON.parse(storage.getItem('session')!);
      expect(parsed).not.toHaveProperty('extra');
    });
  });

  describe('getSession', () => {
    it('returns null when nothing has been stored', () => {
      expect(manager.getSession()).toBeNull();
    });

    it('returns the stored session', () => {
      manager.saveSession(validSession);
      const session = manager.getSession();
      expect(session).toEqual(validSession);
    });

    it('returns null for corrupt stored data', () => {
      storage.setItem('session', '{ not valid json }');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(manager.getSession()).toBeNull();
      consoleSpy.mockRestore();
    });

    it('returns null when stored object is missing required fields', () => {
      storage.setItem('session', JSON.stringify({ sid: 'only-sid' }));
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      expect(manager.getSession()).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('clearSession', () => {
    it('removes the stored session', () => {
      manager.saveSession(validSession);
      manager.clearSession();
      expect(manager.getSession()).toBeNull();
    });

    it('does not throw when there is nothing to clear', () => {
      expect(() => manager.clearSession()).not.toThrow();
    });
  });
});
