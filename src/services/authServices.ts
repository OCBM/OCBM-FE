import customFetch from '@/utils/fetcher';
import { toast } from 'react-toastify';

function ErrorMsg(err: any) {
  if (Array.isArray(err)) {
    return err[0];
  }
  return err;
}

export const loginUserThunk = async (url: any, user: any, thunkAPI: any) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    const errorMsg = ErrorMsg(error.response?.data.message) || error.message;
    toast.error(errorMsg);
    thunkAPI.rejectWithValue(error.response.data.message);
  }
};
