import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
  // Other reducers...
  auth: authSlice,
});

export default rootReducer;
