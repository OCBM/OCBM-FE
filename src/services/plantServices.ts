import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { apiInstance } from '@/lib/axios';

export const PLANT_SERVICES = {
  getAllPlantsbyUserid: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.plants.get}/userId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addPlant: async (body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.post(SERVICES.plants.add, formData, {
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

  getAllPlants: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.plants.get}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllPlantsByOrgId: async (orgId: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.plants.get}/organizationId=${orgId}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updatePlantbyId: async (orgId: string, plantId: any, body: any) => {
    try {
      const formData = new FormData();
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.put(
        `${SERVICES.plants.update}/organizationId=${orgId}&plantId=${plantId}`,
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

  deletePlantById: async (orgId: string, plantId: string) => {
    try {
      const res = await apiInstance.delete(`${SERVICES.plants.delete}/organizationId=${orgId}&plantId=${plantId}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllPlantsSets: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.plants.get}/plantId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllPlantByUserId: async (id: string | undefined) => {
    try {
      const res = await apiInstance.get(`${SERVICES.plants.get}/userId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
