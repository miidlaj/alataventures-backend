/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import * as saltedMd5 from 'salted-md5';
import * as path from 'path';
import multer from 'multer'; // Import as a namespace

@Global() // Mark the module as global
@Module({
  providers: [
    {
      provide: 'SaltedMd5',
      useValue: saltedMd5,
    },
    {
      provide: 'Path',
      useValue: path,
    },
    {
      provide: 'Multer',
      useFactory: () => multer({ storage: multer.memoryStorage() }), // Use a factory function
    },
  ],
  exports: ['SaltedMd5', 'Path', 'Multer'],
})
export class SharedModule {}
