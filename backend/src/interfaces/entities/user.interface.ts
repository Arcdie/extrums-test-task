import { HydratedDocument, Types } from 'mongoose';

import { EUserRole } from '../user-role.enum';

export interface IUserTemplate {
  name: string;
  role: EUserRole,
  email: string;
  password: string;
};

export interface IUser extends IUserTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserModel extends HydratedDocument<IUser> {
  _doc: IUser & { _id: Types.ObjectId };
};
