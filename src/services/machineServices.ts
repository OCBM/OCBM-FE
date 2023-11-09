import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const MACHINE_SERVICES = {
  getAllMachines: async () => {
    try {
      const res = await apiInstance.get(SERVICES.machines.get);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllMachinesByMachineLineId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.machines.get}/machineLineId=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  addMachine: async (body: any) => {
    try {
      const res = await apiInstance.post(SERVICES.machines.add, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updateMachineById: async (machineLineId: string, machineId: string, body: any) => {
    try {
      const res = await apiInstance.put(
        `${SERVICES.machines.update}/machineLineId=${machineLineId}&machineId=${machineId}`,
        body,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  deleteMachineById: async (machineLineId: string, machineId: string) => {
    try {
      const res = await apiInstance.delete(
        `${SERVICES.machines.delete}/machineLineId=${machineLineId}&machineId=${machineId}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
