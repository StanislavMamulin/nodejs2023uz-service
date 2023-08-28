import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { LoggingService } from './logger/LoggingService.service';

const logger = new LoggingService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(logger);

  const env = dotenv.config();
  dotenvExpand.expand(env);

  await app.listen(process.env.PORT);
  console.log('Service started on port', process.env.PORT);
}

bootstrap();

process.on('unhandledRejection', (reason, p) => {
  logger.writeError(`Unhandled Rejection at: Promise ${p}, reason: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.writeError(`Uncaught Exception thrown: ${err}`);
  process.exit(1);
});
