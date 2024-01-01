import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import { HttpExceptionFilter } from './core/http.exception';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor())
  // app.useGlobalFilters(new HttpExceptionFilter());
  const reflector: Reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  const configService = app.get(ConfigService);
  const port: string = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
