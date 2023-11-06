import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { toast } from 'react-toastify';
import { HELPER_SERVICES } from './helperServices';

export const USER_SERVICES = {
  addUser: async (body: any) => {
    try {
      const res = await apiInstance.post(SERVICES.user.add, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getAllUsers: async () => {
    try {
      const res = await apiInstance.get(`${SERVICES.user.get}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getUserbyId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.user.get}/${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  updateUserbyId: async (id: string, body: any) => {
    try {
      const res = await apiInstance.put(`${SERVICES.user.update}/${id}`, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  deleteUserById: async (id: string) => {
    try {
      const res = await apiInstance.delete(`${SERVICES.user.delete}/${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
