import * as bcrypt from 'bcrypt';

export const getSalt = (numberRounds: number) => bcrypt.genSalt(numberRounds);

export const hash = (data: string, salt: string) => bcrypt.hash(data, salt);

export const compare = (str1: string, str2: string) => bcrypt.compare(str1, str2);
