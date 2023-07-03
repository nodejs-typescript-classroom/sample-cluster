import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);
  const port = 3000;
  await app.listen(port, () => {
    logger.log({
      message: `App listen on port ${port}, worker pid=${process.pid}`,
    });
  });
}
bootstrap();
