import constants from '../config/constants';

import { getSalt, hash } from '../libs/bcrypt.lib';

import * as userRepository from '../repositories/user.repository';

import { EErrorCode } from '../interfaces/error-code.enum';
import { EResponseType } from '../interfaces/response-type.enum';
import { IFail, ISuccess } from '../interfaces/result.interface';

import { IUser, IUserTemplate } from '../interfaces/entities/user.interface';

const hashPassword = async (password: string) => {
  const salt = await getSalt(constants.numberRoundsForPasswordSalt);
  return hash(password, salt);
}

export const createUser = async (userData: IUserTemplate): Promise<IFail | ISuccess<IUser>> => {
  const user = await userRepository.findOneByEmail(userData.email);

  if (user) {
    return {
      status: false,
      message: EErrorCode.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      responseType: EResponseType.badRequestResponse,
    };
  }

  const hashedPassword = await hashPassword(userData.password);

  const newUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  return {
    status: true,
    result: newUser,
  };
};
