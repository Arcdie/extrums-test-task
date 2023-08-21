import config from '../config';

import { sign } from '../libs/jwt.lib';
import { compare } from '../libs/bcrypt.lib';

import * as userRepository from '../repositories/user.repository';

import { EErrorCode } from '../interfaces/error-code.enum';
import { EResponseType } from '../interfaces/response-type.enum';
import { IFail, ISuccess } from '../interfaces/result.interface';
import { IUserJWTPayload } from '../interfaces/user-jwt-payload.interface';

import { LoginUserDto } from '../controllers/dto/login-user.dto';

export const getJWTToken = (data: IUserJWTPayload) => sign(data, config.jwt.secret);

export const loginUser = async (loginDto: LoginUserDto): Promise<IFail | ISuccess<string>> => {
  const user = await userRepository.findOneByEmail(loginDto.email);
  const isCorrectPassword = user ? await compare(loginDto.password, user.password) : false;

  if (!user || !isCorrectPassword) {
    return {
      status: false,
      message: EErrorCode.NO_USER_WITH_THIS_CREDENTIALS,
      responseType: EResponseType.notFoundResponse,
    };
  }

  const token = await getJWTToken({ userId: user._id });

  if (!token) {
    return {
      status: false,
      message: EErrorCode.CANT_LOGIN_USER,
      responseType: EResponseType.errorResponse,
    };
  }

  return {
    status: true,
    result: token,
  };
};
