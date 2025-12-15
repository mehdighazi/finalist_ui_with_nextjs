// src/store/slices/sidebarSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  visible: boolean;
}

const initialState: SidebarState = {
  visible: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    showMenu(state) {
      state.visible = true;
    },
    hideMenu(state) {
      state.visible = false;
    },
    toggleMenu(state) {   // اگر بخواهی با یک دکمه تغییر حالت بدهی
      state.visible = !state.visible;
    },
  },
});

export const { showMenu, hideMenu, toggleMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
