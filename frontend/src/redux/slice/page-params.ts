import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface PageParams {
  url?: string;
  origin_url?: string;
  params?: Record<string, unknown>;
}

interface PageParamsState {
  stack: PageParams[];
}

const initialState: PageParamsState = {
  stack: [],
};

const pageParamsSlice = createSlice({
  name: 'pageParams',
  initialState,
  reducers: {
    pushPage(state, action: PayloadAction<PageParams>) {
      state.stack.push(action.payload);
    },
    popPage(state) {
      state.stack.pop();
    },
  },
});

export const { pushPage, popPage } = pageParamsSlice.actions;

export const previousPage = (state: RootState): PageParams | undefined =>
  state.pageParams.stack[state.pageParams.stack.length - 1];

export default pageParamsSlice.reducer;
