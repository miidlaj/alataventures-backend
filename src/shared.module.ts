/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import * as saltedMd5 from 'salted-md5';
import * as path from 'path';
import * as multer from 'multer';

@Global() // Mark the module as global
@Module({
  providers: [
    {
      provide: 'SaltedMd5', // Custom provider token
      useValue: saltedMd5,
    },
    {
      provide: 'Path', // Custom provider token
      useValue: path,
    },
    {
      provide: 'Multer', // Custom provider token
      useValue: multer({ storage: multer.memoryStorage() }),
    },
  ],
  exports: ['SaltedMd5', 'Path', 'Multer'], // Export the providers for use in other modules
})
export class SharedModule {}
