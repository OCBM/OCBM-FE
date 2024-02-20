import { HELPER_SERVICES } from './helperServices';
import { toast } from 'react-toastify';
import { getToken } from '@/lib/axios';
import { Config } from '@/config';

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
  // getAllReports: async (request: { minTimestamp: string; maxTimestamp: string; macAddress: string }) => {
  //   try {
  //     const minTimestampEncodedString = encodeURIComponent(request.minTimestamp);
  //     const maxTimestampEncodedString = encodeURIComponent(request.maxTimestamp);
  //     const res: any = await iotApiInstance.get(
  //       `/sensor-reading/report/${request.macAddress}/range?minTimestamp=${minTimestampEncodedString}&maxTimestamp=${maxTimestampEncodedString}`,
  //       { responseType: 'blob' },
  //     );

  //     let filename = `${generateRandomString(12)}.xlsx`;

  //     const extractedFileName = extractFileName(res.headers['content-disposition']);
  //     if (extractedFileName) {
  //       filename = extractedFileName;
  //     }

  //     const linkElement = document.createElement('a');
  //     linkElement.href = URL.createObjectURL(
  //       new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
  //     );
  //     linkElement.setAttribute('target', '_blank');
  //     linkElement.setAttribute('download', filename);
  //     linkElement.style.display = 'none';
  //     document.body.appendChild(linkElement);
  //     linkElement.click();
  //     URL.revokeObjectURL(linkElement.href);
  //     document.body.removeChild(linkElement);
  //     return res.data;
  //   } catch (error: any) {
  //     const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
  //     toast.error(errorMsg);
  //     console.log(error);
  //   }
  // },

  getAllReports: async (request: { minTimestamp: string; maxTimestamp: string; macAddress: string }) => {
    try {
      const minTimestampEncodedString = encodeURIComponent(request.minTimestamp);
      const maxTimestampEncodedString = encodeURIComponent(request.maxTimestamp);
      const downloadURL = `${Config.OMNEX_SENSOR_URL}/sensor-reading/report/${request.macAddress}/minTimestamp/${minTimestampEncodedString}/maxTimestamp/${maxTimestampEncodedString}`;
      const response: any = await fetch(downloadURL, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      });

      let filename = `${generateRandomString(12)}.xlsx`;

      console.log('response', response);
      console.log('headers', response.headers);
      for (let entry of response.headers.entries()) {
        console.log(entry);
        if (entry[0] === 'content-disposition') {
          console.log('content-disposition', entry[1]);
          const extractedFileName = extractFileName(entry[1]);
          if (extractedFileName) {
            filename = extractedFileName;
            console.log('Extracted File Name:', filename);
          }
        }
      }

      const linkElement = document.createElement('a');
      linkElement.href = URL.createObjectURL(
        await response.blob({ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      );
      linkElement.setAttribute('target', '_blank');
      linkElement.setAttribute('download', filename);
      // Make the anchor element hidden
      linkElement.style.display = 'none';
      // Append the anchor to the document
      document.body.appendChild(linkElement);
      // Programmatically click the link to trigger the download
      linkElement.click();
      // Clean up the object URL and remove the anchor from the document
      URL.revokeObjectURL(linkElement.href);
      document.body.removeChild(linkElement);
      return response.data;
    } catch (error: any) {
      const errorMsg = HELPER_SERVICES.ErrorMsg(error.response?.data.message) || error?.message;
      toast.error(errorMsg);
      console.log(error);
    }
  },
};
