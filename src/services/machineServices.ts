import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { apiInstance } from '@/lib/axios';

export const MACHINE_SERVICES = {
  getAllMachines: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.machines.get}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getAllMachinesByPlantId: async (plantId: string, page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.machines.get}/plantId=${plantId}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllMachinesByMachineLineId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.machines.get}/machineLineId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllMachinesByMachineId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.machines.get}/machineId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addMachine: async (body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.post(SERVICES.machines.add, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updateMachineById: async (machineLineId: string, machineId: string, body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.put(
        `${SERVICES.machines.update}/machineLineId=${machineLineId}&machineId=${machineId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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
