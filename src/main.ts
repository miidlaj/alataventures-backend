import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { HttpExceptionFilter } from './exception.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serviceAccount = {
    type: 'service_account',
    project_id: 'alataventures-1bb4a',
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email:
      'firebase-adminsdk-ogw0z@alataventures-1bb4a.iam.gserviceaccount.com',
    client_id: '117132283540829421281',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ogw0z%40alataventures-1bb4a.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  };

  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.BUCKET_URL,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
