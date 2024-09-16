import { Module } from '@nestjs/common';
import { getSequlizeConfig } from './sequelize.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CarRouteModule } from './car-route/car-route.module';
import { EngineRouteModule } from './engine-route/engine-route.module';
import { TransmissionRouteModule } from './transmission-route/transmission-route.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync(getSequlizeConfig()),
    AuthModule,
    CarRouteModule,
    EngineRouteModule,
    TransmissionRouteModule,
  ],
})
export class AppModule {}
