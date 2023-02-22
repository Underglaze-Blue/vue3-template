import type MemoryCache from '@/utils/memoryCache';

const handleResCache = (
  data: any,
  resCache: MemoryCache,
  cacheKey?: string,
  cacheTime?: number
) => {
  if (cacheKey) {
    if (resCache.has(cacheKey)) {
      resCache.put(cacheKey, data);
      return;
    }
    resCache.put(cacheKey, data, cacheTime);
  }
};

export { handleResCache };
