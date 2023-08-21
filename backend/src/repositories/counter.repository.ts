import Counter from '../models/counter.model';
import CounterHistory from '../models/counter-history.model';

import { ICounter, ICounterModel } from '../interfaces/entities/counter.interface';

// Actual Counter
export const createActualCounter = async () => {
  const newCounter = new Counter({ value: 0 }).save();
  return (await newCounter)._doc;
};

export const findActualCounter = async () =>
  unwrap(await Counter.findOne({}).exec());

export const updateActualCounter = async (counter: ICounter, newValue: number) => {
  return unwrap((await Counter.findByIdAndUpdate(counter._id, {
    value: newValue,
    updatedAt: new Date(),
  }, { new: true })));
};

// Counters History
export const addCounterToHistory = async (counter: ICounter) => {
  const newCounter = new CounterHistory({
    value: counter.value,
  }).save();
  
  return (await newCounter)._doc;
};

export const getCountersHistory = async () =>
  unwrapMany(await CounterHistory.find({}).sort({ createdAt: -1 }).exec());

const unwrap = (entity: ICounterModel | null) => entity?._doc;
const unwrapMany = (entities: ICounterModel[]) => entities.map(e => e._doc);
