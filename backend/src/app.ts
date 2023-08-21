import 'reflect-metadata';

import log from './libs/winston.lib';

import { setEnvironment } from './config/environment.config';

setEnvironment();

import {
  bootstrap,
  getAddress,
} from './services/app.service';

import { restoreCounter } from './services/counter.service';

import migrations from './migrations';

bootstrap()
  .then(async () => {
    log.info(`App is running at ${getAddress()}`);
    log.info('Connection to db is successful');

    await migrations();
    
    setInterval(async () => {
      console.log('Started restoring counter');
      const result = await restoreCounter();

      if (!result.status) {
        console.log('Cant restore counter', result.message);
      }
    }, 60 * 1000);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});
