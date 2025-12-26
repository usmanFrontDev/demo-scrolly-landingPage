import Axios from 'axios';
import { useApiConfigStore } from '../store/apiConfigStore';


export const BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const { enableAuth, getToken } = useApiConfigStore.getState();

  if (enableAuth && getToken) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    const { enableAuth } = useApiConfigStore.getState();

    if (enableAuth && err?.response?.status === 401) {
      window.location.href = '/signin';
    }

    return Promise.reject(err);
  },
);
