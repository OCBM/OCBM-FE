import apiInstance from '@/lib/axios';
import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';

export const SHOP_SERVICES = {
  getAllShops: async (page?: number, limit?: number, sort?: 'asc' | 'dsc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.shops.get}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllShopsByPlantId: async (id: string) => {
    try {
      const res = await apiInstance.get(`${SERVICES.shops.get}/plantId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addShop: async (body: any) => {
    try {
      const res = await apiInstance.post(SERVICES.shops.add, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  updateShopById: async (plantId: string, shopId: string, body: any) => {
    try {
      const res = await apiInstance.put(`${SERVICES.shops.update}/plantId=${plantId}&shopId=${shopId}`, body);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  deleteShopById: async (plantId: string, shopId: string) => {
    try {
      const res = await apiInstance.delete(`${SERVICES.shops.delete}/plantId=${plantId}&shopId=${shopId}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
