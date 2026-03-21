import { RequestClass } from './RequestClass';

let _instance: RequestClass | null = null;

export const getRequestClass = (): RequestClass => {
  if (!_instance) _instance = new RequestClass({ baseURL: '/api' });
  return _instance;
};
