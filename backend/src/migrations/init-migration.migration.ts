import * as userService from '../services/user.service';
import * as counterRepository from '../repositories/counter.repository';

import { getFakeFullName } from '../libs/faker.lib';

import { EUserRole } from '../interfaces/user-role.enum';

export default async () => {
  const existCounter = await counterRepository.findActualCounter();

  if (existCounter) {
    return;
  }

  console.log('First script execution, creating users and counter entities');

  const [adminUser, commonUser, counter] = await Promise.all([
    userService.createUser({
      name: getFakeFullName(),
      role: EUserRole.Admin,
      email: 'admin@mail.ua',
      password: 'password',
    }),
    userService.createUser({
      name: getFakeFullName(),
      role: EUserRole.User,
      email: 'common@mail.ua',
      password: 'password',
    }),
    counterRepository.createActualCounter(),
  ]);

  if (!adminUser || !commonUser) {
    throw new Error('Error occurred while users creating');
  }

  if (!counter) {
    throw new Error('Error occurred while counter creating');
  }

  console.log('Entities created. Project is ready for work');
};
