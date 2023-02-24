import Api from '@/service/request';
import type { NormalizeData } from '@/service/request/http.type';

interface TestType {}
interface SuccessType {
  nutrientEval: string;
  nutrientId: string;
  nutrientName: string;
  persent: string;
  remark: string;
  standardWeight: string;
  weight: string;
}

export default class Test {
  static testRequest(params?: TestType): Promise<NormalizeData<SuccessType[]>> {
    return Api.http.get<SuccessType[]>('/test/', params);
  }
}
