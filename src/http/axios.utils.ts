import type { ITransformUrl, IRemovePendingUrl } from './axios.type';

export const transformUrl = (config: any) => {
  return config as string;
};

export const removePendingUrl: IRemovePendingUrl = (str, map) => {
  if (map.has(str) && map.get(str)) {
    (map.get(str) as () => void)();
    map.delete(str);
  }
  console.log(map);
};
