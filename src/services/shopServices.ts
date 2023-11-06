import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const SHOP_SERVICES = {
  getAllShopsbyPlantid: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.shops.get}/plantId=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
