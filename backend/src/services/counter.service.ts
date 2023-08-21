import * as counterRepository from '../repositories/counter.repository';

import { EErrorCode } from '../interfaces/error-code.enum';
import { EResponseType } from '../interfaces/response-type.enum';
import { IFail, ISuccess } from '../interfaces/result.interface';

import { IUser } from '../interfaces/entities/user.interface';
import { EUserRole } from '../interfaces/user-role.enum';
import { ICounter } from '../interfaces/entities/counter.interface';

const updateCounter = async (counter: ICounter, newValue: number): Promise<IFail | ISuccess<ICounter>> => {
  const resultUpdate = await counterRepository.updateActualCounter(counter, newValue);
  
  if (!resultUpdate) {
    return {
      status: false,
      message: EErrorCode.CANT_UPDATE_COUNTER,
      responseType: EResponseType.badRequestResponse,
    };
  }

  await counterRepository.addCounterToHistory(counter);

  return {
    status: true,
    result: resultUpdate,
  };
}

export const incrementCounter = async (user: IUser): Promise<IFail | ISuccess<ICounter>> => {
  if (user.role !== EUserRole.Admin) {
    return {
      status: false,
      message: EErrorCode.PERMISSIONS_DENIED,
      responseType: EResponseType.forbiddenResponse,
    };
  }

  const actualCounter = await counterRepository.findActualCounter();

  if (!actualCounter) {
    return {
      status: false,
      message: EErrorCode.NO_ACTUAL_COUNTER,
      responseType: EResponseType.notFoundResponse,
    };
  }

  return updateCounter(actualCounter, actualCounter.value + 1);
};

export const decrementCounter = async (user: IUser): Promise<IFail | ISuccess<ICounter>> => {
  if (user.role !== EUserRole.Admin) {
    return {
      status: false,
      message: EErrorCode.PERMISSIONS_DENIED,
      responseType: EResponseType.forbiddenResponse,
    };
  }

  const actualCounter = await counterRepository.findActualCounter();

  if (!actualCounter) {
    return {
      status: false,
      message: EErrorCode.NO_ACTUAL_COUNTER,
      responseType: EResponseType.notFoundResponse,
    };
  }

  return updateCounter(actualCounter, actualCounter.value - 1);
};

export const restoreCounter = async (): Promise<IFail | ISuccess<ICounter>> => {
  const actualCounter = await counterRepository.findActualCounter();

  if (!actualCounter) {
    return {
      status: false,
      message: EErrorCode.NO_ACTUAL_COUNTER,
      responseType: EResponseType.notFoundResponse,
    };
  }

  if (actualCounter.value !== 0) {
    return updateCounter(actualCounter, 0);
  }

  return {
    status: true,
    result: actualCounter,
  };
};
