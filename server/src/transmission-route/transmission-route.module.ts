import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TransmissionRouteService } from './transmission-route.service';
import { TransmissionRouteController } from './transmission-route.controller';
import { VerifyRefreshTokens } from 'src/middleware/veryfiTokens';
import Transmission from 'src/models/Transmission';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Transmission])],
  controllers: [TransmissionRouteController],
  providers: [TransmissionRouteService],
  exports: [TransmissionRouteService],
})
export class TransmissionRouteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRefreshTokens).forRoutes('/transmission');
  }
}
