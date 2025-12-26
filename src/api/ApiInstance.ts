import Axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

const getAuthToken = () => localStorage.getItem('authToken');

export interface IAPIResponse<T> {
  status: boolean;
  message: string;
  data: T | null;
}

// Axios instance
export const axiosInstance: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export class API {
  private static handleResponse<RES>(response: AxiosResponse): IAPIResponse<RES> {
    const responseData = response?.data as {
      data: RES;
      status: boolean;
      message: string;
    };
    return {
      data: responseData?.data ?? null,
      status: responseData?.status ?? false,
      message: responseData?.message ?? '',
    };
  }

  private static handleError(error: unknown): never {
    throw error;
  }

  static async Get<RES>(url: string, config?: AxiosRequestConfig): Promise<IAPIResponse<RES>> {
    try {
      const res = await axiosInstance.get<RES>(url, config);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  }

  static async Post<REQ, RES>(url: string, payload: REQ, config?: AxiosRequestConfig) {
    try {
      const res = await axiosInstance.post<RES>(url, payload, config);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  }

  static async Put<REQ, RES>(url: string, payload?: REQ, config?: AxiosRequestConfig) {
    try {
      const res = await axiosInstance.put<RES>(url, payload, config);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  }

  static async Patch<REQ, RES>(url: string, payload?: REQ, config?: AxiosRequestConfig) {
    try {
      const res = await axiosInstance.patch<RES>(url, payload, config);
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  }

  static async Delete<REQ, RES>(url: string, data?: REQ) {
    try {
      const res = await axiosInstance.delete<RES>(url, { data });
      return this.handleResponse(res);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
