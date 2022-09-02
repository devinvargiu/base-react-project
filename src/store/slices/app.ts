import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../types';

const INITIAL_STATE = {
  offline: false,
  showChangelog: false,
} as AppState;

const appSlice: Slice = createSlice({
  name: 'app',

  initialState: INITIAL_STATE,

  reducers: {
    setOfflineMode: (state: AppState, action: PayloadAction<boolean>) => {
      state.offline = action.payload;
      return state;
    },

    showChangelog: (state: AppState, action: PayloadAction<boolean>) => {
      state.showChangelog = action.payload;
      return state;
    },
  },
});

export const { setOfflineMode, showChangelog } = appSlice.actions;

export const appReducer = appSlice.reducer;
