import type { PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import pageParamsReducer, {
  popPage,
  previousPage,
  pushPage,
  type PageParams,
} from '../page-params';

const initialState = { stack: [] };

function makeStore() {
  return configureStore({
    reducer: { pageParams: pageParamsReducer },
  });
}

describe('pageParams slice', () => {
  describe('initial state', () => {
    it('has an empty stack', () => {
      expect(
        pageParamsReducer(undefined, { type: '@@INIT' } as PayloadAction)
      ).toEqual(initialState);
    });
  });

  describe('pushPage', () => {
    it('adds a page to the stack', () => {
      const page: PageParams = { url: '/dashboard', origin_url: '/' };
      const state = pageParamsReducer(initialState, pushPage(page));
      expect(state.stack).toHaveLength(1);
      expect(state.stack[0]).toEqual(page);
    });

    it('accumulates multiple pages on the stack', () => {
      const s1 = pageParamsReducer(initialState, pushPage({ url: '/a' }));
      const s2 = pageParamsReducer(s1, pushPage({ url: '/b' }));
      expect(s2.stack).toHaveLength(2);
      expect(s2.stack[1].url).toBe('/b');
    });

    it('stores optional params payload', () => {
      const page: PageParams = {
        url: '/tasks',
        params: { filter: 'active', page: 2 },
      };
      const state = pageParamsReducer(initialState, pushPage(page));
      expect(state.stack[0].params).toEqual({ filter: 'active', page: 2 });
    });
  });

  describe('popPage', () => {
    it('removes the last page from the stack', () => {
      const withTwoPages = {
        stack: [{ url: '/a' }, { url: '/b' }],
      };
      const state = pageParamsReducer(withTwoPages, popPage());
      expect(state.stack).toHaveLength(1);
      expect(state.stack[0].url).toBe('/a');
    });

    it('does nothing on an empty stack', () => {
      const state = pageParamsReducer(initialState, popPage());
      expect(state.stack).toHaveLength(0);
    });
  });

  describe('previousPage selector', () => {
    it('returns the last item on the stack', () => {
      const store = makeStore();
      store.dispatch(pushPage({ url: '/first' }));
      store.dispatch(pushPage({ url: '/second' }));

      const prev = previousPage(store.getState());
      expect(prev?.url).toBe('/second');
    });

    it('returns undefined when the stack is empty', () => {
      const store = makeStore();
      expect(previousPage(store.getState())).toBeUndefined();
    });

    it('reflects the stack after a pop', () => {
      const store = makeStore();
      store.dispatch(pushPage({ url: '/first' }));
      store.dispatch(pushPage({ url: '/second' }));
      store.dispatch(popPage());

      expect(previousPage(store.getState())?.url).toBe('/first');
    });
  });
});
