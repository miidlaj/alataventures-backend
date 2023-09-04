import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './exception.middleware';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const serviceAccount = require('../src/firebase/alataventures-1bb4a-firebase-adminsdk-ogw0z-d38691c63b.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://alataventures-1bb4a.appspot.com',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
