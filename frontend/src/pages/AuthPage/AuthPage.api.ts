import { AxiosLib } from '../../libs/axios.lib';

import { HOST_URL } from '../../App.constants';

import { IFail, ISuccess } from '../../interfaces/result.interface';

const URL_LOGIN = `${HOST_URL}/auth/login`;

const { makePostRequest } = AxiosLib;

export const loginRequest = (data: {
  email: string;
  password: string;
}) => makePostRequest<IFail | ISuccess<string>>(URL_LOGIN, data);
