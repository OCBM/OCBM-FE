import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const MACHINE_LINE_SERVICES = {
  getAllMachineLine: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      // limit is 1000 temporarily, since I did not get the meta data from backend. So setting a large limit.
      const res = await apiInstance.get(
        `${SERVICES.machineLine.get}?page=${page || 1}&limit=${limit || 1000}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updateMachineLineById: async (machineLineId: string, shopId: string, body: any) => {
    try {
      const res = await apiInstance.put(
        `${SERVICES.machineLine.update}/shopId=${shopId}&machineLineId=${machineLineId}`,
        body,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  addMachineLine: async (body: any) => {
    try {
      const res = await apiInstance.post(SERVICES.machineLine.add, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  deleteMachineLineById: async (machineLineId: string, shopId: string) => {
    try {
      const res = await apiInstance.delete(
        `${SERVICES.machineLine.delete}/shopId=${shopId}&machineLineId=${machineLineId}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
