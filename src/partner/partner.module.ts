import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './partner.schema';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService, FileUploadService],
})
export class PartnerModule {}
