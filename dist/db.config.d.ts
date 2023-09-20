import { ConfigType } from '@nestjs/config';
import { Connection } from 'mongoose';
import mongodbConfig from './mongodb.config';
export declare const databaseConnectionProviders: {
    provide: any;
    useFactory: (dbConfig: ConfigType<typeof mongodbConfig>) => Connection;
    inject: string[];
}[];
