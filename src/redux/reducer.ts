// src/store/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  // Other reducers...
  user: userSlice,
});

export default rootReducer;
