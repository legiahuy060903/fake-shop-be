import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import { HttpExceptionFilter } from './core/http.exception';
import cookieParser from 'cookie-parser';
import moment from 'moment-timezone';
moment.tz.setDefault("Asia/Ho_Chi_Minh");
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>("PORT_CLIENT"),
    credentials: true,
    preflightContinue: false
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter());
  const reflector: Reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  const port: string = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
