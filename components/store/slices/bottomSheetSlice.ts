import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { JSX } from 'react';

interface BottomSheetState {
  visible: boolean;
  title: string;
  renderContent?: () => JSX.Element; // فانکشنی که محتوای BottomSheet را تولید می‌کند
  ptSX: string;
}

const initialState: BottomSheetState = {
  visible: false,
  title: '',
  renderContent: undefined,
  ptSX: '25%',
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    showBottomSheet(state, action: PayloadAction<{ title: string; renderContent?: () => JSX.Element; ptSX?: string }>) {
      state.visible = true;
      state.title = action.payload.title;
      state.renderContent = action.payload.renderContent;
      state.ptSX = action.payload.ptSX ?? '25%';
    },
    hideBottomSheet(state) {
      state.visible = false;
      state.title = '';
      state.renderContent = undefined;
      state.ptSX = '25%';
    },
  },
});

export const { showBottomSheet, hideBottomSheet } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
