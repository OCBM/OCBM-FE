import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import plantSlice from './slices/plantSlice';

const rootReducer = combineReducers({
  // Other reducers...
  auth: authSlice,
  plantRegistration: plantSlice,
});

export default rootReducer;
