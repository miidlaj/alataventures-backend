import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Partner, PartnerDocument } from './partner.schema';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name)
    private readonly partnerModel: Model<PartnerDocument>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async uploadImage(image: Express.Multer.File): Promise<PartnerDocument> {
    try {
      const newImage = new this.partnerModel();
      this.fileUploadService
        .uploadFileToFirebase(image, 'partner-images')
        .then((url) => (newImage.imageUrl = url));
      return newImage.save();
    } catch (err) {
      throw new ServiceUnavailableException(
        "Can't upload image at the moment!",
      );
    }
  }

  async getAllImages(): Promise<PartnerDocument[]> {
    const imageData = await this.partnerModel.find();
    if (!imageData || imageData.length == 0) {
      throw new NotFoundException('Image datas not found!');
    }
    return imageData;
  }

  async getImageById(imageId: string): Promise<PartnerDocument | null> {
    return await this.partnerModel.findById(imageId).exec();
  }

  async deleteImage(imageId: string): Promise<PartnerDocument> {
    const deletedImage = await this.partnerModel.findByIdAndDelete(imageId);
    if (!deletedImage) {
      throw new NotFoundException(`Image #${imageId} not found`);
    } else {
      const prefixToRemove =
        'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
      const imgUrl = deletedImage.imageUrl;
      const queryStringStart = '?GoogleAccessId=';
      const parts = imgUrl.split(queryStringStart);
      const path = parts[0].replace(prefixToRemove, '');
      console.log(path);
      this.fileUploadService.deleteFile(path);
    }
    return deletedImage;
  }
}
