import { loginUserThunk } from '@/services/UserThunk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  user: null,
};

export const loginUser = createAsyncThunk('user/loginUser', (user: any, thunkAPI) => {
  return loginUserThunk('auth/login', user, thunkAPI);
});

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.message;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
