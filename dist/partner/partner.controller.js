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
exports.PartnerController = void 0;
const common_1 = require("@nestjs/common");
const partner_service_1 = require("./partner.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
let PartnerController = class PartnerController {
    constructor(partnerService) {
        this.partnerService = partnerService;
    }
    async uploadImage(response, image) {
        try {
            const newImage = this.partnerService.uploadImage(image);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Image has been created successfully',
                newImage,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getImages(response) {
        try {
            const imageData = await this.partnerService.getAllImages();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All image datas found successfully',
                imageData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deletePortfolio(response, imageId) {
        try {
            const deletedImage = await this.partnerService.deleteImage(imageId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Image deleted successfully',
                deletedImage,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
exports.PartnerController = PartnerController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "getImages", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "deletePortfolio", null);
exports.PartnerController = PartnerController = __decorate([
    (0, common_1.Controller)('partner'),
    __metadata("design:paramtypes", [partner_service_1.PartnerService])
], PartnerController);
//# sourceMappingURL=partner.controller.js.map