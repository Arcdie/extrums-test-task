import { Response } from 'express';

import { validate } from '../libs/dto-validator.lib';

import {
  dynamicResponse,
  successResponse,
  badRequestResponse,
} from '../libs/express-responses.lib';

import * as authService from '../services/auth.service';

import { LoginUserDto } from './dto/login-user.dto';

export const loginUser = async (req: { body: LoginUserDto }, res: Response) => {
  const errors = await validate(req.body, LoginUserDto);

  if (errors) {
    return badRequestResponse(res, errors);
  }

  const result = await authService.loginUser(req.body);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};
