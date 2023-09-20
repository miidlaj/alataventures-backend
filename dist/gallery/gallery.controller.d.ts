/// <reference types="multer" />
import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    uploadImage(response: any, image: Express.Multer.File): Promise<any>;
    getImages(response: any): Promise<any>;
    deletePortfolio(response: any, imageId: string): Promise<any>;
}
