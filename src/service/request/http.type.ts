import type { AxiosRequestConfig } from 'axios';
// 简单数据的数据类型
export interface SimpleData<T> {
  data: T;
  message: string;
  code: number;
  success: boolean;
}

// 知了请求 参数类型
export interface ZlRequestPayload {
  clientInfo: any;
  data: any;
  style: string;
}

export interface IInstanceType {
  get: <T = any>(url: string, params?: any) => Promise<SimpleData<T>>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<SimpleData<T>>;

  postFormData: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<SimpleData<T>>;
}

export interface IApi {
  http: IInstanceType;
  zlHttp: IInstanceType;
}
