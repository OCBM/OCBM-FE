import { iotApiInstance } from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const SETSTANDARDS_SERVICES = {
  getAllSetstandards: async () => {
    try {
      const res = await iotApiInstance.get(SERVICES.setStandards.get);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addSetstandards: async (body: any) => {
    try {
      const res = await iotApiInstance.post(SERVICES.setStandards.post, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  addSetstandardsBulk: async (body: any) => {
    try {
      const res = await iotApiInstance.post(SERVICES.setStandards.bulk, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
