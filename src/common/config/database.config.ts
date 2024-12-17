/* eslint-disable prettier/prettier */
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig: MongooseModuleOptions = {
  uri: 'mongodb://192.168.1.38:27017/ssly-app',
};
