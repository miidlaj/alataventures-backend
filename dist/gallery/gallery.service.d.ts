/// <reference types="multer" />
import { GalleryDocument } from './gallery.schema';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/file-upload/file-upload.service';
export declare class GalleryService {
    private readonly galleryModel;
    private readonly fileUploadService;
    constructor(galleryModel: Model<GalleryDocument>, fileUploadService: FileUploadService);
    uploadImage(image: Express.Multer.File): Promise<GalleryDocument>;
    getAllImages(): Promise<GalleryDocument[]>;
    getImageById(imageId: string): Promise<GalleryDocument | null>;
    deleteImage(imageId: string): Promise<GalleryDocument>;
}
