import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';

export const MACHINE_SERVICES = {
  getAllMachinesbyShopid: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.machineLine.get}/shopId=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
