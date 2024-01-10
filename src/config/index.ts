/// <reference types="vite/client" />

export class Config {
  static OMNEX_BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
  static SENSOR_BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URLL;
}
