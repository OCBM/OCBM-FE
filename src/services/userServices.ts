import { SERVICES } from '@/utils/sitemap';
import { toast } from 'react-toastify';
import { HELPER_SERVICES } from './helperServices';
import { apiInstance } from '@/lib/axios';

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
  getAllUsers: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.user.get}?page=${page || 1}&limit=${limit || 1000}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getUserById: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.user.get}/${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getUserByRole: async (role: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.user.get}/role=${role}`);
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
