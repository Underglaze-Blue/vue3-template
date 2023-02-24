import type { AxiosRequestConfig } from 'axios';
// 简单数据的数据类型
export interface NormalizeData<T> {
  data: T;
  message: string;
  code: number;
  success: boolean;
}
export interface IInstanceType {
  get: <T = any>(url: string, params?: any) => Promise<NormalizeData<T>>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<NormalizeData<T>>;

  postFormData: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<NormalizeData<T>>;
}

export interface IApi {
  http: IInstanceType;
}
