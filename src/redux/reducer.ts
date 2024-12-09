import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import plantSlice from './slices/plantSlice';
import sensorSlice from './slices/sensorSlice';

const rootReducer = combineReducers({
  // Other reducers...
  auth: authSlice,
  plantRegistration: plantSlice,
  sensorSlice,
});

export default rootReducer;
