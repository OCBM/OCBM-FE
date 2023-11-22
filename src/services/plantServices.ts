import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

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
      const res = await apiInstance.post(SERVICES.plants.add, body);
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
        `${SERVICES.plants.get}?page=${page || 1}&limit=${limit || 1000}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updatePlantbyId: async (orgId: string, plantId: any, body: any) => {
    try {
      const res = await apiInstance.put(`${SERVICES.plants.update}/organizationId=${orgId}&plantId=${plantId}`, body);
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
};
