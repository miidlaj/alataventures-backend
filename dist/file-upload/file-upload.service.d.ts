/// <reference types="multer" />
export declare class FileUploadService {
    private readonly saltedMd5;
    private readonly path;
    constructor(saltedMd5: any, path: any);
    uploadFileToFirebase(file: Express.Multer.File, folder: string): Promise<string>;
    deleteFile(path: string): Promise<void>;
}
