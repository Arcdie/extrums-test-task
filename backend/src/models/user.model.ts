import mongoose from 'mongoose';

import { EUserRole } from '../interfaces/user-role.enum';
import { IUser, IUserModel } from '../interfaces/entities/user.interface';

const modelSchema: Record<keyof Omit<IUser, '_id'>, any> = {
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: Number,
    enum: EUserRole,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
};

const User = new mongoose.Schema<IUserModel>(modelSchema, { versionKey: false });
export default mongoose.model<IUserModel>('User', User, 'users');
