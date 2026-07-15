
import { configureStore } from '@reduxjs/toolkit';
import sidebarMenuReducer from './slices/sidebarMenuSlice';
import alertReducer from './slices/alertSlice';
import bottomSheetReducer from './slices/bottomSheetSlice';
import dialogReducer from './slices/dialogSlice'

export const store = configureStore({
    reducer: {
        sidebarMenu: sidebarMenuReducer,
        alert: alertReducer,
        bottomSheet: bottomSheetReducer,
        dialog:dialogReducer
    },
    // اضافه کردن این بخش برای نادیده گرفتن ارور تابع در BottomSheet
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // نادیده گرفتن اکشن خاص
                ignoredActions: ['bottomSheet/showBottomSheet'],
                // نادیده گرفتن مسیر خاص در استیت
                ignoredPaths: ['bottomSheet.renderContent'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;