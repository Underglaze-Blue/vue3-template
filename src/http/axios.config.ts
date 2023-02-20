import Axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  CancelTokenStatic,
} from 'axios';
import type {
  RequestConfig,
  RequestInterceptors,
  CreateRequestConfig,
  IAbortController,
  IRemovePendingUrl,
} from './axios.type';

import { transformUrl, removePendingUrl } from './axios.utils';

// 接口前缀
// const BASE_URL = '';

class Request {
  // axios 实例
  instance: AxiosInstance;

  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;

  private CancelToken: CancelTokenStatic = Axios.CancelToken;

  // * 存放取消请求控制器 Map
  abortControllerMap: IAbortController;

  constructor(config: CreateRequestConfig) {
    this.instance = Axios.create(config);

    this.abortControllerMap = new Map();

    this.interceptorsObj = config.interceptors;
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => res,
      (err: any) => err
    );

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );

    // 全局响应拦截器保证最后执行
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // config.params = Object.assign()
        return config;
      }
    );
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在 res.data 下，所以我们直接返回 res.data
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => err
    );
  }

  cancelAllRequest: IRemovePendingUrl = () => {
    this.abortControllerMap.forEach((c) => {
      c();
    });
  };

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }

      // url存在保存取消请求方法和当前请求url
      if (!config.unAbort) {
        // 获取上一次请求相同的url
        // const prevRequest = this.abortControllerMap.get()
        // prevRequest && prevRequest.abort()
        removePendingUrl(transformUrl(config), this.abortControllerMap);
        // 把当前请求的url set到 map
        config.cancelToken = new this.CancelToken((c: any) => {
          setTimeout(() => {
            this.abortControllerMap.set(transformUrl(config), c);
          }, 0);
        });
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }

          removePendingUrl(transformUrl(config), this.abortControllerMap);

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
      // .finally(() => {})
    });
  }
}

export default Request;
export { RequestConfig, RequestInterceptors };
