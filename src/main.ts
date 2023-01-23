import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe()); // enable global validation pipe based on class validator

  const config = new DocumentBuilder()
    .setTitle('Hemonto API')
    .setDescription(
      'A Proof of Concept API System. <br> \
      - User: example@eminence.red | Password: ACvJW94aAxxWfLucC7HZwDlFiwElvq <br> \
      - Login at /auth to get a token. Use the token in the Authorize button. <br> \
      - You should seed the employees first. User is auto seeded at start.',
    )
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
