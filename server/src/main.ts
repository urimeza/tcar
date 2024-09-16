import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
  }));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(3001);
  console.log('started on', process.env.PORT);
}
bootstrap();
