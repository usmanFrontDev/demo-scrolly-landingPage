import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';



export interface APIResult<T> {
  status: boolean;
  message: string;
  data: T;
}

export const COMMON_ERROR = 'Something went wrong';


export async function apiRequest<RES, REQ = unknown>(
  config: AxiosRequestConfig<REQ>,
): Promise<RES> {
  try {
    const response = await axiosInstance.request<any>(config);

    const payload = response?.data;

    if (payload?.status === false) {
      throw new Error(payload?.message || COMMON_ERROR);
    }

    return payload?.data ?? payload;
  } catch (error: any) {
    throw (
      error?.response?.data?.message ||
      error?.message ||
      COMMON_ERROR
    );
  }
}
