import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { Gallery, GallerySchema } from './gallery.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService, FileUploadService],
})
export class GalleryModule {}
