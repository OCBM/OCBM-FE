import { toast } from 'react-toastify';
import { HELPER_SERVICES } from './helperServices';
import apiInstance from '@/lib/axios';

export const AUTH_SERVICES = {
  login: async (url: any, user: any, thunkAPI: any) => {
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
