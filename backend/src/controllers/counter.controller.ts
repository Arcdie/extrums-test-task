import { Request, Response } from 'express';

import {
  dynamicResponse,
  successResponse,
  notFoundResponse,
} from '../libs/express-responses.lib';

import * as counterService from '../services/counter.service';
import * as counterRepository from '../repositories/counter.repository';

import { EErrorCode } from '../interfaces/error-code.enum';
import { IUser } from '../interfaces/entities/user.interface';

export const getActualCounter = async (req: Request, res: Response) => {
  const result = await counterRepository.findActualCounter();

  if (!result) {
    return notFoundResponse(res, EErrorCode.NO_ACTUAL_COUNTER);
  }

  return successResponse(res, { status: true, result });
};

export const incrementCounter = async (req: { user: IUser }, res: Response) => {
  const result = await counterService.incrementCounter(req.user);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};

export const decrementCounter = async (req: { user: IUser }, res: Response) => {
  const result = await counterService.decrementCounter(req.user);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};

export const getCountersHistory = async (req: Request, res: Response) => {
  const result = await counterRepository.getCountersHistory();
  return successResponse(res, { status: true, result });
};
