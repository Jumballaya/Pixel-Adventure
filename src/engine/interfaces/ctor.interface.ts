export interface Ctor<T = any> {
  new (...params: any[]): T;
}
