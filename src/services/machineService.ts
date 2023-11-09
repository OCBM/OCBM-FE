import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { toast } from 'react-toastify';
import { HELPER_SERVICES } from './helperServices';

export const MACHINE_SERVICES = {
  getAllMachinesbyShopid: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.machines.get}/shopId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
