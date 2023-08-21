import { EErrorCode } from './error-code.enum';
import { EResponseType } from './response-type.enum';

export interface IFail {
  status: false;
  responseType: EResponseType;
  message: EErrorCode | string;
};

export interface ISuccess<T> {
  status: true;
  result: T;
};

export type TResult<T> = IFail | ISuccess<T>;
