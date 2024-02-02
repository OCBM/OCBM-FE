import { AUTH_SERVICES } from '@/services/authServices';
import { SERVICES } from '@/utils/sitemap';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, LoginDataType } from './auth.types';

const initialState: AuthInitialState = {
  loggedIn: false,
  isLoading: false,
  user: null,
  organization: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', (user: LoginDataType, thunkAPI) => {
  return AUTH_SERVICES.login(SERVICES.auth.login, user, thunkAPI);
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log('PAYLOAD', payload);
        state.isLoading = false;
        state.loggedIn = true;
        state.user = payload?.message;
        state.organization = payload?.message?.organization?.[0];
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
console.log('auth', loginUser);

export const { logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
