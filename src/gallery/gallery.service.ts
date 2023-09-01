import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, GalleryDocument } from './gallery.schema';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name)
    private readonly galleryModel: Model<GalleryDocument>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async uploadImage(image: Express.Multer.File): Promise<GalleryDocument> {
    try {
      const newImage = new this.galleryModel();
      this.fileUploadService
        .uploadFileToFirebase(image, 'gallery-images')
        .then((url) => (newImage.imageUrl = url));
      return newImage.save();
    } catch (err) {
      throw new ServiceUnavailableException(
        "Can't upload image at the moment!",
      );
    }
  }

  async getAllImages(): Promise<GalleryDocument[]> {
    const imageData = await this.galleryModel.find();
    if (!imageData || imageData.length == 0) {
      throw new NotFoundException('Image datas not found!');
    }
    return imageData;
  }

  async getImageById(imageId: string): Promise<GalleryDocument | null> {
    return await this.galleryModel.findById(imageId).exec();
  }

  async deleteImage(imageId: string): Promise<GalleryDocument> {
    const deletedImage = await this.galleryModel.findByIdAndDelete(imageId);
    if (!deletedImage) {
      throw new NotFoundException(`Image #${imageId} not found`);
    } else {
      const prefixToRemove =
        'https://storage.googleapis.com/alataventuress.appspot.com/';
      const imgUrl = deletedImage.imageUrl;
      const queryStringStart = '?GoogleAccessId=';
      const parts = imgUrl.split(queryStringStart);
      const path = parts[0].replace(prefixToRemove, '');
      this.fileUploadService.deleteFile(path);
    }
    return deletedImage;
  }
}
