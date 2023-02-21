import Request from '../http/axios.config';
import type { SimpleData } from './http.type';

const requestAxios = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
});

class Instance {
  static get<T>(url: string, params: object = {}): Promise<SimpleData<T>> {
    return requestAxios.request({
      url,
      params,
      method: 'get',
    });
  }

  static post<T>(url: string, params: object = {}): Promise<SimpleData<T>> {
    return requestAxios.request({
      url,
      params,
      method: 'post',
    });
  }

  static postFormData<T>(
    url: string,
    params: object = {},
    data: object = {}
  ): Promise<SimpleData<T>> {
    return requestAxios.request({
      url,
      params,
      data,
      method: 'post',
    });
  }
}

export default Instance;
