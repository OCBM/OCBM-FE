import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { apiInstance } from '@/lib/axios';

export const MACHINE_LINE_SERVICES = {
  getAllMachineLine: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.machineLine.get}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getMachineLinesByShopId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.machineLine.get}/shopId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getMachineLinesByPlantId: async (id: string, page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.machineLine.get}/plantId=${id}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
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
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.put(
        `${SERVICES.machineLine.update}/shopId=${shopId}&machineLineId=${machineLineId}`,
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
  addMachineLine: async (body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      console.log('object', formData);
      const res = await apiInstance.post(SERVICES.machineLine.add, formData, {
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
