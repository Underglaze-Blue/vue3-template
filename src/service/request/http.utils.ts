import { useStorage } from '@vueuse/core';
import type { AxiosResponse } from 'axios';
import type { SimpleData } from './http.type';

const token = useStorage('token', null, sessionStorage);
const schoolId = useStorage('schoolId', null, sessionStorage);

// 知了请求 成功的 code
const SUCCESS_CODE = '0000000';

const transformCode = (afterCode: number | string): number => {
  if (typeof afterCode === 'string') {
    return afterCode === SUCCESS_CODE ? 200 : 500;
  }
  return afterCode;
};
// 中间件，用来处理不同的返回数据类型，返回成为统一的结构体
const simpleDataFn = (res: AxiosResponse): AxiosResponse => {
  if (Object.prototype.hasOwnProperty.call(res.data, 'rtnCode')) {
    res.data = {
      data: res.data.bizData || {},
      message: res.data.msg || '',
      code: transformCode(res.data.rtnCode),
      success: res.data.rtnCode === SUCCESS_CODE,
    };
    return res;
  }
  res.data = {
    data: res.data.data,
    message: res.data.msg || '',
    code: transformCode(res.data.code),
    success: res.data.success,
  };
  return res;
};

export { token, schoolId, simpleDataFn };
