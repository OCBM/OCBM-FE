import { apiInstance1 } from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const SETSTANDARD_SERVICES = {
  getAllSetStandard: async () => {
    try {
      const res = await apiInstance1.get(SERVICES.setStandard.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteSetStandardById: async (macAddress: any) => {
    try {
      const res = await apiInstance1.delete(`${SERVICES.setStandard.delete}/${macAddress}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
