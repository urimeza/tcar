import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CarRouteService } from './car-route.service';
import { CarRouteController } from './car-route.controller';
import { VerifyRefreshTokens } from 'src/middleware/veryfiTokens';
import { SequelizeModule } from '@nestjs/sequelize';
import Car from 'src/models/Car';
import EngineType from 'src/models/EngineType';
import Transmission from 'src/models/Transmission';

@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
    SequelizeModule.forFeature([Transmission]),
    SequelizeModule.forFeature([EngineType]),
  ],
  controllers: [CarRouteController],
  providers: [CarRouteService],
  exports: [CarRouteService],
})
export class CarRouteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRefreshTokens).forRoutes('/car');
  }
}
