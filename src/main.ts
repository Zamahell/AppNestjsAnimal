import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MainBootstrap')

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  logger.log("INICIO CONEXION DB ESTABLECIDA")
  await app.listen(process.env.PORT);
}
bootstrap();
