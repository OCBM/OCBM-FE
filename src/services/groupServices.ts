import { apiInstance } from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const GROUP_SERVICES = {
  getAllGroups: async () => {
    try {
      const res = await apiInstance.get(SERVICES.groups.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
