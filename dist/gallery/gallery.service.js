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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const gallery_schema_1 = require("./gallery.schema");
const mongoose_2 = require("mongoose");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let GalleryService = class GalleryService {
    constructor(galleryModel, fileUploadService) {
        this.galleryModel = galleryModel;
        this.fileUploadService = fileUploadService;
    }
    async uploadImage(image) {
        try {
            const newImage = new this.galleryModel();
            await this.fileUploadService
                .uploadFileToFirebase(image, 'gallery-images')
                .then((url) => (newImage.imageUrl = url));
            return newImage.save();
        }
        catch (err) {
            console.log(err);
            throw new common_1.ServiceUnavailableException("Can't upload image at the moment!");
        }
    }
    async getAllImages() {
        const imageData = await this.galleryModel.find();
        if (!imageData || imageData.length == 0) {
            throw new common_1.NotFoundException('Image datas not found!');
        }
        return imageData;
    }
    async getImageById(imageId) {
        return await this.galleryModel.findById(imageId).exec();
    }
    async deleteImage(imageId) {
        const deletedImage = await this.galleryModel.findByIdAndDelete(imageId);
        if (!deletedImage) {
            throw new common_1.NotFoundException(`Image #${imageId} not found`);
        }
        else {
            const prefixToRemove = 'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
            const imgUrl = deletedImage.imageUrl;
            const queryStringStart = '?GoogleAccessId=';
            const parts = imgUrl.split(queryStringStart);
            const path = parts[0].replace(prefixToRemove, '');
            this.fileUploadService.deleteFile(path);
        }
        return deletedImage;
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gallery_schema_1.Gallery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_upload_service_1.FileUploadService])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map