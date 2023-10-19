import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const PLANT_SERVICES = {
  getAllPlantsbyUserid: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.plants.get}/userId=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllPlants: async () => {
    try {
      const res = await apiInstance.get(SERVICES.plants.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
