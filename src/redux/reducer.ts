import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import plantSlice from './slices/plantSlice';
// import shopSlice from './slices/shopSlice';

const rootReducer = combineReducers({
  // Other reducers...
  auth: authSlice,
  plantRegistration: plantSlice,
  // shop: shopSlice,
});

export default rootReducer;
