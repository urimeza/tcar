import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EngineRouteService } from './engine-route.service';
import { EngineRouteController } from './engine-route.controller';
import EngineType from 'src/models/EngineType';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerifyRefreshTokens } from 'src/middleware/veryfiTokens';

@Module({
  imports: [SequelizeModule.forFeature([EngineType])],
  controllers: [EngineRouteController],
  providers: [EngineRouteService],
  exports: [EngineRouteService],
})
export class EngineRouteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRefreshTokens).forRoutes('/engine');
  }
}
