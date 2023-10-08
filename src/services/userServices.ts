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
};
