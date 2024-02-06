import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { iotApiInstance } from '@/lib/axios';

function generateRandomString(length: any) {
  const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
    randomString += allowedCharacters.charAt(randomIndex);
  }

  return randomString;
}
function extractFileName(header: any) {
  const match = header.match(/filename=(.+)$/);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

export const REPORTS_SERVICE = {
  getAllReports: async (request: { minTimestamp: string; maxTimestamp: string; macAddress: string }) => {
    try {
      const minTimestampEncodedString = encodeURIComponent(request.minTimestamp);
      const maxTimestampEncodedString = encodeURIComponent(request.maxTimestamp);
      const res: any = await iotApiInstance.get(
        `/sensor-reading/report/${request.macAddress}/range?minTimestamp=${minTimestampEncodedString}&maxTimestamp=${maxTimestampEncodedString}`,
        { responseType: 'blob' },
      );

      let filename = `${generateRandomString(12)}.xlsx`;

      const extractedFileName = extractFileName(res.headers['content-disposition']);
      if (extractedFileName) {
        filename = extractedFileName;
      }

      const linkElement = document.createElement('a');
      linkElement.href = URL.createObjectURL(
        new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      );
      linkElement.setAttribute('target', '_blank');
      linkElement.setAttribute('download', filename);
      linkElement.style.display = 'none';
      document.body.appendChild(linkElement);
      linkElement.click();
      URL.revokeObjectURL(linkElement.href);
      document.body.removeChild(linkElement);
      return res.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
