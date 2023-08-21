import mongoose from 'mongoose';

import { ICounter, ICounterModel } from '../interfaces/entities/counter.interface';

const modelSchema: Record<keyof Omit<ICounter, '_id' | 'updatedAt'>, any> = {
  value: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const CounterHistory = new mongoose.Schema<ICounterModel>(modelSchema, { versionKey: false });
export default mongoose.model<ICounterModel>('CounterHistory', CounterHistory, 'counters-history');
