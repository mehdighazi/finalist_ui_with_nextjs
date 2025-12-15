import { configureStore } from '@reduxjs/toolkit';
import sidebarMenuReducer from './slices/sidebarMenuSlice';
import alertReducer from './slices/alertSlice';
import bottomSheetReducer from './slices/bottomSheetSlice';

export const store = configureStore({
    reducer: {
        sidebarMenu: sidebarMenuReducer,
        alert: alertReducer,
        bottomSheet: bottomSheetReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
