import { Request, Response, NextFunction } from 'express';

import config from '../config';

import { verify } from '../libs/jwt.lib';

import {
  notFoundResponse,
  unauthorizedResponse,
} from '../libs/express-responses.lib';

import * as userRepository from '../repositories/user.repository';

import { EErrorCode } from '../interfaces/error-code.enum';
import { IUserJWTPayload } from '../interfaces/user-jwt-payload.interface';

export const getTokenFromRequest = (req: Request): string | null =>
  req.cookies?.authorization ||
  req.cookies?.Authorization ||
  req.headers?.authorization ||
  req.headers?.Authorization;

export default async (req: Request, res: Response, next: NextFunction) => {
  let token = getTokenFromRequest(req);

  if (!token) {
    return unauthorizedResponse(res, EErrorCode.NO_AUTH_TOKEN);
  }

  if (token.includes('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  const payload = await verify<IUserJWTPayload>(token, config.jwt.secret);

  if (!payload) {
    return unauthorizedResponse(res, EErrorCode.INVALID_AUTH_TOKEN);
  }

  const user = await userRepository.findOneById(payload.userId);

  if (!user) {
    return notFoundResponse(res, EErrorCode.NO_USER_WITH_THIS_ID);
  }

  req.user = user;
  next();
};
