import { apiInstance, iotApiInstance } from '@/lib/axios';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { Config } from '@/config';

export const SENSOR_SERVICES = {
  getSensorData: async (minTimestamp: string, macAddress?: string) => {
    try {
      const res = await iotApiInstance.get(`/sensor-reading/timestamp/${minTimestamp}/mac-address/${macAddress}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getSensorsDetails: async (sensorId: string) => {
    try {
      const res = await iotApiInstance.post(`/sensors`, [sensorId]);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  /**
   * Fetches all sensors from the IOT backend.
   * @async
   * @returns The data of all sensors if successful.
   * @throws Will throw an error if the API call fails.
   */
  getAllSensor: async () => {
    try {
      const res = await iotApiInstance.get(`/sensor-reading/get-all-sensors`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error?.response?.data?.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  /**
   * Fetches all sensors from the OCBM backend backend.
   * @async
   * @returns The data of all sensors if successful.
   * @throws Will throw an error if the API call fails.
   */
  getAllSensorOcbm: async (page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(`/sensor?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getSensorsByElementId: async (id: string) => {
    try {
      const res = await apiInstance.get(`/sensor/elementId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getSensorsByOrgId: async (id: string) => {
    try {
      const res = await iotApiInstance.get(`/sensors/${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getAllSensorOcbmByPlantID: async (plantId: string, page?: number, limit?: number, sort?: 'asc' | 'desc') => {
    try {
      const res = await apiInstance.get(
        `/sensor/plantId=${plantId}?page=${page || 1}&limit=${limit || 10}&sort=${sort || 'desc'}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getSensorsBySensorId: async (id: string) => {
    try {
      const res = await apiInstance.get(`/sensor/sensorId=${id}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  getSensorProperties: async (macAddress: string) => {
    try {
      const res = await iotApiInstance.get(`/sensor-properties/${macAddress}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getAllSensorsByMacaddress: async (macAddress: string[]) => {
    try {
      const res = await iotApiInstance.post(`/sensors`, macAddress);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
  getAllSensorsByOrganization: async () => {
    try {
      const res = await iotApiInstance.get(`/sensors/${Config.VITE_CURRENT_ORGANIZATION}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },

  postSensorOcbm: async (body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.post(`/sensor`, formData, {
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
  updateSensorOcbm: async (elementId: string, sensorId: string, body: any) => {
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }
      const res = await apiInstance.put(`/sensor/elementId=${elementId}&sensorId=${sensorId}`, formData, {
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
  deleteSensorOcbm: async (elementId: string, sensorId: string) => {
    try {
      const res = await apiInstance.delete(`/sensor/elementId=${elementId}&sensorId=${sensorId}`);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
