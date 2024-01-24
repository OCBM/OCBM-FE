import { toast } from 'react-toastify';
import { HELPER_SERVICES } from './helperServices';

import { LoginDataType } from '@/redux/slices/authSlice/auth.types';
import { apiInstance } from '@/lib/axios';

export const AUTH_SERVICES = {
  login: async (url: string, user: LoginDataType, thunkAPI: any) => {
    try {
      const resp = await apiInstance.post(url, user);
      toast.success('Login successfull');
      return resp.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error.message;
      toast.error(errorMsg);
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
};
