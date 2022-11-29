import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './prisma/notFound.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3333);
}

bootstrap();
