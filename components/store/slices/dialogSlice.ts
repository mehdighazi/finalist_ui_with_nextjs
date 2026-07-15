import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { JSX } from 'react';

interface DialogState {
  visible: boolean;
  title: string;
  renderContent?: () => JSX.Element; // فانکشنی که محتوای Dialog را تولید می‌کند
  ptSX: string;
  size:string;
}

const initialState: DialogState = {
  visible: false,
  title: '',
  renderContent: undefined,
  ptSX: '25%',
   size:"small"
};

const DialogSlice = createSlice({
  name: 'Dialog',
  initialState,
  reducers: {
    showDialog(state, action: PayloadAction<{ size:string; title: string; renderContent?: () => JSX.Element; ptSX?: string }>) {
      state.visible = true;
      state.title = action.payload.title;
      state.renderContent = action.payload.renderContent;
      state.ptSX = action.payload.ptSX ?? '25%';
       state.size = action.payload.size;
    },
    hideDialog(state) {
      state.visible = false;
      state.title = '';
      state.renderContent = undefined;
      state.ptSX = '25%';
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
