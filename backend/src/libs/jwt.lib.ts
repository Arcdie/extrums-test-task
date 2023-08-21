import jwt from 'jsonwebtoken';

export const sign = <T>(data: T, secret: string): Promise<string | undefined> =>
  new Promise(res => jwt.sign(
    { data, },
    secret,
    {},
    (err, token) => res(err ? undefined : token)
  ));

export const verify = <T>(token: string, secret: string): Promise<T | false> =>
  new Promise(res => jwt.verify(
    token,
    secret,
    (err, data) => {
      if (err || !data) {
        return res(false);
      }

      return res(typeof data === 'string' ? data : data.data);
    }
  ));
