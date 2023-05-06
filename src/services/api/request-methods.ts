import { AxiosResponse } from 'axios';

export interface IRequestMethods<T = any, D = any> {
  url: string;
  get?: () => Promise<AxiosResponse<T, D>>;
  post?: (data: T) => Promise<AxiosResponse<T, D>>;
  put?: (data: T, id: string) => Promise<AxiosResponse<T, D>>;
  delete?: (id: string, data?: T) => Promise<AxiosResponse<T, D>>;
  deleteList?: (ids: string[]) => Promise<AxiosResponse<T, D>>;
}
