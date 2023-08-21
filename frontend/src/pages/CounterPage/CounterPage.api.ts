import { AxiosLib } from '../../libs/axios.lib';

import { HOST_URL } from '../../App.constants';

import { ICounter } from '../../interfaces/counter.interface';
import { IFail, ISuccess } from '../../interfaces/result.interface';

const URL_GET_COUNTER = `${HOST_URL}/api/counter/read`;
const URL_INCREMENT_COUNTER = `${HOST_URL}/api/counter/incr`;
const URL_DECREMENT_COUNTER = `${HOST_URL}/api/counter/decr`;

const {
  makeGetRequest,
  makePostRequest,
} = AxiosLib;

export const getHeadersWithAuthorizationToken = (authToken: string) => ({
  headers: { Authorization: authToken },
});

export const getCounterRequest = () => makeGetRequest<IFail | ISuccess<ICounter>>(URL_GET_COUNTER);

export const incrementCounterRequest = (authToken: string) =>
  makePostRequest<IFail | ISuccess<ICounter>>(
    URL_INCREMENT_COUNTER,
    {},
    getHeadersWithAuthorizationToken(authToken),
  );

export const decrementCounterRequest = (authToken: string) =>
  makePostRequest<IFail | ISuccess<ICounter>>(
    URL_DECREMENT_COUNTER,
    {},
    getHeadersWithAuthorizationToken(authToken),
  );
