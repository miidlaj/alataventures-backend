"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryModule = void 0;
const common_1 = require("@nestjs/common");
const gallery_controller_1 = require("./gallery.controller");
const gallery_service_1 = require("./gallery.service");
const gallery_schema_1 = require("./gallery.schema");
const mongoose_1 = require("@nestjs/mongoose");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let GalleryModule = class GalleryModule {
};
exports.GalleryModule = GalleryModule;
exports.GalleryModule = GalleryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: gallery_schema_1.Gallery.name, schema: gallery_schema_1.GallerySchema }]),
        ],
        controllers: [gallery_controller_1.GalleryController],
        providers: [gallery_service_1.GalleryService, file_upload_service_1.FileUploadService],
    })
], GalleryModule);
//# sourceMappingURL=gallery.module.js.map