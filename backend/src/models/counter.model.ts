import mongoose from 'mongoose';

import { ICounter, ICounterModel } from '../interfaces/entities/counter.interface';

const modelSchema: Record<keyof Omit<ICounter, '_id'>, any> = {
  value: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
};

const Counter = new mongoose.Schema<ICounterModel>(modelSchema, { versionKey: false });
export default mongoose.model<ICounterModel>('Counter', Counter, 'counter');
