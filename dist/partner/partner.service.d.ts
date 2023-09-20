/// <reference types="multer" />
import { PartnerDocument } from './partner.schema';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Model } from 'mongoose';
export declare class PartnerService {
    private readonly partnerModel;
    private readonly fileUploadService;
    constructor(partnerModel: Model<PartnerDocument>, fileUploadService: FileUploadService);
    uploadImage(image: Express.Multer.File): Promise<PartnerDocument>;
    getAllImages(): Promise<PartnerDocument[]>;
    getImageById(imageId: string): Promise<PartnerDocument | null>;
    deleteImage(imageId: string): Promise<PartnerDocument>;
}
