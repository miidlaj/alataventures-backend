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
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let FileUploadService = class FileUploadService {
    constructor(saltedMd5, path) {
        this.saltedMd5 = saltedMd5;
        this.path = path;
    }
    async uploadFileToFirebase(file, folder) {
        const bucket = admin.storage().bucket();
        const name = this.saltedMd5(file.originalname, 'SUPER-S@LT!');
        const fileName = name + this.path.extname(file.originalname);
        const fileUploadOptions = {
            destination: `${folder}/${fileName}`,
        };
        try {
            bucket
                .file(fileUploadOptions.destination)
                .createWriteStream()
                .end(file.buffer);
        }
        catch (err) {
            throw new common_1.ServiceUnavailableException('This service is unavailable at the moment');
        }
        const [url] = await bucket.file(`${folder}/${fileName}`).getSignedUrl({
            action: 'read',
            expires: '01-01-2030',
        });
        return url;
    }
    async deleteFile(path) {
        const bucket = admin.storage().bucket();
        try {
            await bucket.file(path).delete();
        }
        catch (err) {
            throw new common_1.ServiceUnavailableException('This service is unavailable at the moment');
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SaltedMd5')),
    __param(1, (0, common_1.Inject)('Path')),
    __metadata("design:paramtypes", [Object, Object])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map