/// <reference types="multer" />
import { PartnerService } from './partner.service';
export declare class PartnerController {
    private readonly partnerService;
    constructor(partnerService: PartnerService);
    uploadImage(response: any, image: Express.Multer.File): Promise<any>;
    getImages(response: any): Promise<any>;
    deletePortfolio(response: any, imageId: string): Promise<any>;
}
