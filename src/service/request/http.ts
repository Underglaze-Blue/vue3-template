import type { AxiosResponse } from 'axios';
import Request from '../http/axios.config';

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    },
    responseInterceptorsCatch(err) {},
  },
});

export default request;
