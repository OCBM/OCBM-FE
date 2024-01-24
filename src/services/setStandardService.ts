import { apiInstance1 } from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const SETSTANDARDS_SERVICES = {
  getAllSetStandard: async () => {
    try {
      const res = await apiInstance1.get(SERVICES.setStandards.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllSetsbyid: async (id: string) => {
    try {
      const res = await apiInstance1.get(`${SERVICES.setStandards.get}/${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addSetdstandards: async (body: any) => {
    try {
      const res = await apiInstance1.post(SERVICES.setStandards.post, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addSetstandardsBulk: async (body: any) => {
    try {
      const res = await apiInstance1.post(SERVICES.setStandards.bulk, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updateSetdstandards: async (id: string, body: any) => {
    try {
      const res = await apiInstance1.patch(`${SERVICES.setStandards.update}/${id}`, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  deleteSetStandardById: async (macAddress: any) => {
    try {
      const res = await apiInstance1.delete(`${SERVICES.setStandards.delete}/${macAddress}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
