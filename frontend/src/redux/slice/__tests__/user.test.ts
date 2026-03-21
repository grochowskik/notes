import type { PayloadAction } from '@reduxjs/toolkit';
import { describe, expect, it, vi } from 'vitest';
import userReducer, { setLifetime, setLoggedIn, setTimestamp } from '../user';

const initialState = {
  loggedIn: false,
  lifetime: null,
  timestamp: null,
  role: null,
  permissions: [],
};

describe('user slice', () => {
  describe('initial state', () => {
    it('has correct initial state', () => {
      expect(
        userReducer(undefined, { type: '@@INIT' } as PayloadAction)
      ).toEqual(initialState);
    });
  });

  describe('setLoggedIn', () => {
    it('sets loggedIn to true', () => {
      const state = userReducer(
        initialState,
        setLoggedIn({ isLoggedIn: true })
      );
      expect(state.loggedIn).toBe(true);
    });

    it('sets loggedIn to false', () => {
      const state = userReducer(
        { ...initialState, loggedIn: true },
        setLoggedIn({ isLoggedIn: false })
      );
      expect(state.loggedIn).toBe(false);
    });
  });

  describe('setLifetime', () => {
    it('sets the session lifetime', () => {
      const state = userReducer(initialState, setLifetime({ lifetime: 3600 }));
      expect(state.lifetime).toBe(3600);
    });

    it('can update lifetime to a new value', () => {
      const state = userReducer(
        { ...initialState, lifetime: 1000 },
        setLifetime({ lifetime: 7200 })
      );
      expect(state.lifetime).toBe(7200);
    });
  });

  describe('setTimestamp', () => {
    it('sets timestamp to current Date.now()', () => {
      const now = Date.now();
      vi.spyOn(Date, 'now').mockReturnValue(now);

      const state = userReducer(initialState, setTimestamp());
      expect(state.timestamp).toBe(now);

      vi.restoreAllMocks();
    });

    it('updates timestamp on each dispatch', () => {
      const first = 1000000;
      const second = 2000000;

      vi.spyOn(Date, 'now')
        .mockReturnValueOnce(first)
        .mockReturnValueOnce(second);

      const stateAfterFirst = userReducer(initialState, setTimestamp());
      const stateAfterSecond = userReducer(stateAfterFirst, setTimestamp());

      expect(stateAfterFirst.timestamp).toBe(first);
      expect(stateAfterSecond.timestamp).toBe(second);

      vi.restoreAllMocks();
    });
  });

  describe('action independence', () => {
    it('does not mutate other fields when setting loggedIn', () => {
      const prev = {
        loggedIn: false,
        lifetime: 3600,
        timestamp: 999,
        role: null,
        permissions: [] as import('../user').Permission[],
      };
      const state = userReducer(prev, setLoggedIn({ isLoggedIn: true }));
      expect(state.lifetime).toBe(3600);
      expect(state.timestamp).toBe(999);
    });
  });
});
