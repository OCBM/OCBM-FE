import { Config } from '@/config';
import axios from 'axios';

const customFetch = axios.create({
  baseURL: `${Config.OMNEX_BACKEND_URL}/`,
});

export default customFetch;
