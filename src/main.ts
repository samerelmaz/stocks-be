import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loggingMiddleware } from './common/middlewares/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const appPrefix = 'api/v1';

  app.setGlobalPrefix(appPrefix);

  app.use(loggingMiddleware);

  const config = new DocumentBuilder()
    .setTitle('Stocks API')
    .setDescription('The stocks API description')
    .setVersion('1.0')
    .addTag('stocks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${appPrefix}/docs`, app, document);

  await app.listen(3001);
}
bootstrap();
