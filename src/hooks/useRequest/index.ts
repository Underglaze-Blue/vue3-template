import { shallowRef, ref, watch } from 'vue';
import { debounce, throttle } from 'lodash-es';
import MemoryCache from '@/utils/memoryCache';
import type { NormalizeData } from '@/service/request/http.type';
import type {
  BaseOptions,
  Result,
  Run,
  Service,
  FetchService,
  Cancel,
} from './types';
import { loadingDelayAsync, clearLoadingDelayTimer } from './src/loadingDelay';
import Polling from './src/polling';
import { handleResCache } from './src/cache';

// service请求参数缓存
const reqCache = new MemoryCache();

// 请求结果缓存
const resCache = new MemoryCache();

// 默认参数
const defaultOptions = {
  manual: false,
  initialData: undefined,
  onSuccess: () => {},
  onError: () => {},
  formatResult: (data: any) => data,
  pollingInterval: 0,
  pollingWhenHidden: true,
  ready: undefined,
  debounceInterval: undefined,
  throttleInterval: undefined,
  focusTimespan: undefined,
  loadingDelay: 0,
  refreshDeps: [],
  cacheTime: 300000,
  staleTime: 0,
};

const argsSymbolKey = 'argsKey';

const useRequest = <
  ResponseType = any, //  返回的data的类型
  DataType = NormalizeData<ResponseType> //  返回的data的类型的外层
>(
  PromiseRequest: (...args: any[]) => Promise<DataType>, // 异步请求函数
  params?: any | any[], // 参数
  options?: BaseOptions
) => {
  const {
    manual,
    initialData,
    onSuccess,
    onError,
    formatResult,
    pollingInterval,
    pollingWhenHidden,
    ready,
    debounceInterval,
    throttleInterval,
    loadingDelay,
    refreshDeps,
    cacheKey,
    cacheTime,
    staleTime,
  } = { ...defaultOptions, ...options };

  const data = shallowRef<DataType>(initialData);
  const error = ref<Error | undefined>(undefined);
  const loading = ref(false);
  const latestTime = ref<number>(0);

  // 执行网络请求
  let run: Run = async (...args: any[]) => {
    // 请求开始时间
    const reqTime = +new Date();

    // 判断开启缓存 && 有缓存，先返回缓存
    // 缓存修改并不会阻止顺序执行，service请求会继续发出
    // 也就是所谓SWR能力
    if (cacheKey && resCache.has(cacheKey)) {
      data.value = resCache.get(cacheKey);

      if (latestTime.value + staleTime > reqTime) {
        return;
      }
    } else if (loadingDelay > 0) {
      loadingDelayAsync(loadingDelay).then((): void => {
        loading.value = true;
      });
    } else {
      loading.value = true;
    }

    // 更新最新一次请求开始时间
    latestTime.value = reqTime;

    params && reqCache.put(argsSymbolKey, args);
    const tempParasm = Array.isArray(args[0]) ? [...args[0]] : [...args];

    // 调用请求方法
    PromiseRequest(...tempParasm)
      .then((res) => {
        clearLoadingDelayTimer();
        res = formatResult(res);
        data.value = res;
        loading.value = false;
        onSuccess(res, args);
        // 处理缓存
        handleResCache(res, resCache, cacheKey, cacheTime);
      })
      .catch((e: Error) => {
        loading.value = false;

        error.value = e;

        onError(error.value, args);
      });
    // 非激活状态执行轮询
    // eslint-disable-next-line no-use-before-define
    pollingRun();
  };

  // 取消轮询
  const cancel: Cancel = () => Polling.cancel();

  // 执行轮询
  function pollingRun() {
    if (pollingInterval < 4 || Polling.isActive) {
      return;
    }
    Polling.run(run, pollingInterval, pollingWhenHidden);
  }

  const refresh = () => {
    const args = reqCache.get(argsSymbolKey) || [];
    run(...args);
  };

  // 是否自动执行
  if (!manual && ready === undefined) {
    // 是否携带默认参数
    run(params);

    // 是否执行轮询
    pollingRun();
  }

  // 监听依赖请求是否执行
  watch(
    () => ready,
    (curr) => {
      if (curr?.value === true) {
        refresh();
      }
    },
    { deep: true }
  );

  // 多个监听依赖请求是否执行
  watch(refreshDeps, () => refresh(), { deep: true });

  // 防抖
  if (debounceInterval !== undefined && typeof debounceInterval === 'number') {
    run = debounce(run, debounceInterval);
  }

  // 节流
  if (throttleInterval !== undefined && typeof throttleInterval === 'number') {
    run = throttle(run, throttleInterval);
  }

  // 突变改变data值
  const mutate = (state: any) => {
    data.value = state;
  };

  // 返回值
  const res: Result<DataType> = {
    data,
    error,
    run,
    refresh,
    loading,
    cancel,
    mutate,
  };

  return res;
};

export default useRequest;
