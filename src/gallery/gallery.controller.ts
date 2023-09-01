import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Res() response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    try {
      const newImage = this.galleryService.uploadImage(image);
      return response.status(HttpStatus.CREATED).json({
        message: 'Image has been created successfully',
        newImage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getImages(@Res() response) {
    try {
      const imageData = await this.galleryService.getAllImages();
      return response.status(HttpStatus.OK).json({
        message: 'All image datas found successfully',
        imageData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deletePortfolio(@Res() response, @Param('id') imageId: string) {
    try {
      const deletedImage = await this.galleryService.deleteImage(imageId);
      return response.status(HttpStatus.OK).json({
        message: 'Image deleted successfully',
        deletedImage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
