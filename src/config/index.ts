/// <reference types="vite/client" />

console.log('okkkkk', import.meta.env.VITE_SENSOR_API_URL);
export class Config {
  static OMNEX_BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
  static OMNEX_SENSOR_URL = import.meta.env.VITE_SENSOR_API_URL;
}
