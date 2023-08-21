import { HydratedDocument, Types } from 'mongoose';

export interface ICounterTemplate {
  value: number;
};

export interface ICounter extends ICounterTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface ICounterModel extends HydratedDocument<ICounter> {
  _doc: ICounter & { _id: Types.ObjectId };
};
