import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/models/user';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerifyRefreshTokens } from 'src/middleware/veryfiTokens';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRefreshTokens).forRoutes('auth/tokens/refresh');
  }
}
