import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'visit: alataventures.com';
  }

  getMongoUrl(): string {
    return process.env.MONGO_URL;
  }
}
