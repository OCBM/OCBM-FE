import customFetch from '@/utils/fetcher';

export const loginUserThunk = async (url: any, user: any, thunkAPI: any) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
