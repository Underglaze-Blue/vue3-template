/**
 * loading的延迟计算
 * @param startTime
 * @param loadingDelay
 * @param args
 * @returns
 */
let loadingDelayTimer: ReturnType<typeof setTimeout> | null = null;
export const loadingDelayAsync = (loadingDelay: number) => {
  // eslint-disable-next-line no-use-before-define
  clearLoadingDelayTimer();
  return new Promise((resolve) => {
    loadingDelayTimer = setTimeout(
      () => resolve(loadingDelayTimer),
      Math.max(loadingDelay, 0)
    );
  });
};

/**
 * 取消loading延迟计算Timer
 */
export const clearLoadingDelayTimer = () => {
  if (loadingDelayTimer) {
    clearTimeout(loadingDelayTimer);
  }
};
