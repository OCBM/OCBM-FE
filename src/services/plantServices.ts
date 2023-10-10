import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const PLANT_SERVICES = {
  getAllPlants: async () => {
    try {
      const res = await apiInstance.get(SERVICES.plants.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
