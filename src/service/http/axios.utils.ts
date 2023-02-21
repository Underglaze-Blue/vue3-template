import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import type { ITransformUrl, IRemovePendingUrl } from './axios.type';

// 转换 url 为 map 的key 值，用来取消重复请求
export const transformUrl = (config: AxiosRequestConfig): ITransformUrl => {
  return `${config.url}?${qs.stringify(config.data)}&request_type=${
    config.method
  }/${qs.stringify(config.params)}`;
};

// 取消请求
export const removePendingUrl: IRemovePendingUrl = (str, map) => {
  if (map.has(str) && map.get(str)) {
    (map.get(str) as () => void)();
    map.delete(str);
  }
};
