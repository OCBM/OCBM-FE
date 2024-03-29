import { SERVICES } from '@/utils/sitemap';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { apiInstance } from '@/lib/axios';

export const SHOP_SERVICES = {
  getAllShops: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
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

  getAllShopsByPlantId: async (id: string, page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `${SERVICES.shops.get}/plantId=${id}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  addShop: async (body: any) => {
    try {
      const formData = new FormData();
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.post(SERVICES.shops.add, formData, {
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

  updateShopById: async (plantId: string, shopId: string, body: any) => {
    try {
      const formData = new FormData();
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.put(`${SERVICES.shops.update}/plantId=${plantId}&shopId=${shopId}`, formData, {
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
