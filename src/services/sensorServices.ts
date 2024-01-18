//import { Config } from '@/config';
//import axios from 'axios';

import { iotApiInstance } from '@/lib/axios';
import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
// import iotApiInstance from '@/lib/iot_axios';

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
};
