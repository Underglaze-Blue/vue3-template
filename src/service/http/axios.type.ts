import type {
  AxiosResponse,
  CreateAxiosDefaults,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;

  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;

  responseInterceptorsCatch?: (err: any) => any;
}

// 自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>;
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
  unAbort?: boolean;
}

export type IAbortController = Map<string, () => void>;

// url 转换为 map key
export type ITransformUrl = string;

export interface IRemovePendingUrl {
  (str: string, map: IAbortController): void;
}

export interface BaseData {
  data: any;
  message: string;
  code: number;
}
