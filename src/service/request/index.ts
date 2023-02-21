import Instance from './http';
import ZlInstance from './http.zl';
import type { IApi } from './http.type';

const Api: IApi = {
  http: Instance,
  zlHttp: ZlInstance,
};
export default Api;
