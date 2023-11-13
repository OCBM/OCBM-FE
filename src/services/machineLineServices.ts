import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const MACHINE_LINE_SERVICES = {
  getAllMachineLine: async () => {
    try {
      const res = await apiInstance.get(SERVICES.machineline.get);
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
        `${SERVICES.machineline.update}/shopId=${shopId}&machineLineId=${machineLineId}`,
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
      const res = await apiInstance.post(SERVICES.machineline.add, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  deleteMachinelineById: async (machineLineId: string, shopId: string) => {
    try {
      const res = await apiInstance.delete(
        `${SERVICES.machineline.delete}/shopId=${shopId}&machineLineId=${machineLineId}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
