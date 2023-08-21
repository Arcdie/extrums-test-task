import { IUser } from './interfaces/entities/user.interface';

declare module 'express-serve-static-core' {
  export interface Request {
     user: IUser;
  }
}
