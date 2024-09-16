import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import Car from './models/Car';
import EngineType from './models/EngineType';
import Transmission from './models/Transmission';
import { User } from './models/user';

export const getSequlizeConfig = (): SequelizeModuleAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: () => ({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [Car, EngineType, Transmission, User],
  }),
});
//
