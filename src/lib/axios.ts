import axios from 'axios';
import { Config } from '@/config';
import { store } from '@/redux/store';

function getToken() {
  const isUser = store.getState()?.auth?.user;
  if (isUser) {
    //@ts-ignore
    return isUser?.accessToken;
  }
  return null;
}

const apiInstance = axios.create({
  baseURL: `${Config.OMNEX_BACKEND_URL}`,
});

// Adding an interceptor to set the Authorization header with the token from Redux
apiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiInstance;
