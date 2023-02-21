// 简单数据的数据类型
export interface SimpleData {
  data: any;
  message: string;
  code: number;
}

// 知了请求 参数类型
export interface ZlRequestPayload {
  clientInfo: any;
  data: any;
  style: string;
}
