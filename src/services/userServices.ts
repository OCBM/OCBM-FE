import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const USER_SERVICES = {
  addUser: async (body: any) => {
    try {
      const res = await apiInstance.post(SERVICES.user.add, body);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUserbyRole: async (role: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.user.get}/${role}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUserbyId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.user.get}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateUserbyId: async (id: string, body: any) => {
    try {
      const res = await apiInstance.put(`${SERVICES.user.update}/${id}`, body);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteUserById: async (id: string) => {
    try {
      const res = await apiInstance.delete(`${SERVICES.user.delete}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
