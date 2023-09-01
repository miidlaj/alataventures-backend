import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const serviceAccount = require('../src/firebase/alataventuress-firebase-adminsdk-3hvdu-0035a60956.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
