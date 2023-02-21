import Request from '../http/axios.config';
import type { SimpleData } from './http.type';
import Instance from './http';

const requestAxios = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 响应拦截器
    requestInterceptors: (config) => {
      config.data = {
        clientInfo: {},
        data: config.data,
        style: '',
      };
      return config;
    },
  },
});

class ZlRequest extends Instance {
  static post<T>(url: string, data: object = {}): Promise<SimpleData<T>> {
    return requestAxios.request({
      url,
      data,
      method: 'post',
    });
  }

  // static postFormData<T>(
  //   url: string,
  //   params: object = {}
  // ): Promise<SimpleData<T>> {
  //   console.log(params);
  //   return requestAxios.request({
  //     url,
  //     params,
  //     method: 'post',
  //   });
  // }
}

export default ZlRequest;
