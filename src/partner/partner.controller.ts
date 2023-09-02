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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @UseGuards(AuthGuard)
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
      const newImage = this.partnerService.uploadImage(image);
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
      const imageData = await this.partnerService.getAllImages();
      return response.status(HttpStatus.OK).json({
        message: 'All image datas found successfully',
        imageData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePortfolio(@Res() response, @Param('id') imageId: string) {
    try {
      const deletedImage = await this.partnerService.deleteImage(imageId);
      return response.status(HttpStatus.OK).json({
        message: 'Image deleted successfully',
        deletedImage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
