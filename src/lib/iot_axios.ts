import { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { Config } from '@/config';

let reduxStore: Store;

// getting redux store from redux provider file and using in apis
export const injectStore = (_store: Store) => {
  reduxStore = _store;
};
function getToken() {
  const isUser = reduxStore.getState()?.auth?.user;
  if (isUser) {
    return isUser?.accessToken;
  }
  return null;
}

const iotApiInstance = axios.create({
  baseURL: `${Config.OMNEX_SENSOR_URL}`,
});

// Adding an interceptor to set the Authorization header with the token from Redux
iotApiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default iotApiInstance;
