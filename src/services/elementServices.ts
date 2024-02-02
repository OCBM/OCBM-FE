import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { apiInstance } from '@/lib/axios';

export const ELEMENT_SERVICES = {
  getAllElements: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.element.get}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getAllElementsByPlantId: async (plantId: string, page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.element.get}/plantId=${plantId}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getElementsByMachineId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.element.get}/machineId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getElementByMachineIdAndElementId: async (elementId: string, machineId: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.element.get}/elementId=${elementId}&machineId=${machineId}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addElement: async (body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.post(SERVICES.element.add, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updateElementById: async (machineId: string, elementId: string, body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.put(
        `${SERVICES.element.update}/machineId=${machineId}&elementId=${elementId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  deleteElementById: async (machineId: string, elementId: string) => {
    try {
      const res = await apiInstance.delete(`${SERVICES.element.delete}/machineId=${machineId}&elementId=${elementId}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response.data) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
