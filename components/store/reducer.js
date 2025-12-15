import { combineReducers } from 'redux';

// reducer import
import sidebarMenuReducer from './slices/sidebarMenuSlice';
import alertReducer from "./alertReducer"; // ایمپورت alertReducer
import buttomSheetReducer from './slices/bottomSheetSlice'
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    sidebarMenu: sidebarMenuReducer,
     alert: alertReducer, // اضافه کردن alertReducer
     buttomSheet: buttomSheetReducer, // اضافه کردن buttomReducer
});

export default reducer;
