export interface IFail {
  status: false;
  message: string;
};

export interface ISuccess<T> {
  status: true;
  result: T;
};

export type TResult<T> = IFail | ISuccess<T>;
