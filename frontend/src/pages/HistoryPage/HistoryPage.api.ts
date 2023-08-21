import { AxiosLib } from '../../libs/axios.lib';

import { HOST_URL } from '../../App.constants';

import { ICounter } from '../../interfaces/counter.interface';
import { IFail, ISuccess } from '../../interfaces/result.interface';

const URL_GET_COUNTERS_HISTORY = `${HOST_URL}/api/counter/history`;

const { makeGetRequest } = AxiosLib;

export const getCountersHistory = () => makeGetRequest<IFail | ISuccess<ICounter[]>>(URL_GET_COUNTERS_HISTORY);
