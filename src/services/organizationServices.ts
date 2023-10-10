import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const ORGANIZATION_SERVICES = {
  getAllOrganization: async () => {
    try {
      const res = await apiInstance.get(SERVICES.organization.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
