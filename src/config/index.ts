/// <reference types="vite/client" />

export class Config {
  static OMNEX_BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
  static OMNEX_SENSOR_URL = import.meta.env.VITE_SENSOR_API_URL;
  static OCBM_IOT_SOCKET_URL = import.meta.env.VITE_OCBM_IOT_SOCKET_URL;
  static OCBM_IOT_SOCKET_PATH = import.meta.env.VITE_OCBM_IOT_SOCKET_PATH;
  static VITE_CURRENT_ORGANIZATION = import.meta.env.VITE_CURRENT_ORGANIZATION;
}
