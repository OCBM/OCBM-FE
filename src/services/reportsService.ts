import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { iotApiInstance } from '@/lib/axios';

export const REPORTS_SERVICE = {
  getAllReports: async (request: { minTimestamp: string; maxTimestamp: string; macAddress: string }) => {
    try {
      const minTimestampEncodedString = encodeURIComponent('2024-01-22T07:05:31.588+00:00');
      const maxTimestampEncodedString = encodeURIComponent('2024-01-22T07:07:31.741+00:00');
      const res = await iotApiInstance.get(
        `/sensor-reading/report/${request.macAddress}/range?minTimestamp=${minTimestampEncodedString}&maxTimestamp=${maxTimestampEncodedString}`,
      );
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
