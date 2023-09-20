"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerService = void 0;
const common_1 = require("@nestjs/common");
const partner_schema_1 = require("./partner.schema");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let PartnerService = class PartnerService {
    constructor(partnerModel, fileUploadService) {
        this.partnerModel = partnerModel;
        this.fileUploadService = fileUploadService;
    }
    async uploadImage(image) {
        try {
            const newImage = new this.partnerModel();
            this.fileUploadService
                .uploadFileToFirebase(image, 'partner-images')
                .then((url) => (newImage.imageUrl = url));
            return newImage.save();
        }
        catch (err) {
            throw new common_1.ServiceUnavailableException("Can't upload image at the moment!");
        }
    }
    async getAllImages() {
        const imageData = await this.partnerModel.find();
        if (!imageData || imageData.length == 0) {
            throw new common_1.NotFoundException('Image datas not found!');
        }
        return imageData;
    }
    async getImageById(imageId) {
        return await this.partnerModel.findById(imageId).exec();
    }
    async deleteImage(imageId) {
        const deletedImage = await this.partnerModel.findByIdAndDelete(imageId);
        if (!deletedImage) {
            throw new common_1.NotFoundException(`Image #${imageId} not found`);
        }
        else {
            const prefixToRemove = 'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
            const imgUrl = deletedImage.imageUrl;
            const queryStringStart = '?GoogleAccessId=';
            const parts = imgUrl.split(queryStringStart);
            const path = parts[0].replace(prefixToRemove, '');
            console.log(path);
            this.fileUploadService.deleteFile(path);
        }
        return deletedImage;
    }
};
exports.PartnerService = PartnerService;
exports.PartnerService = PartnerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(partner_schema_1.Partner.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        file_upload_service_1.FileUploadService])
], PartnerService);
//# sourceMappingURL=partner.service.js.map