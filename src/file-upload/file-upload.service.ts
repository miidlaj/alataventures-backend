import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject('SaltedMd5') private readonly saltedMd5: any,
    @Inject('Path') private readonly path: any,
  ) {}

  async uploadFileToFirebase(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const bucket = admin.storage().bucket();
    const name = this.saltedMd5(file.originalname, 'SUPER-S@LT!');
    const fileName = name + this.path.extname(file.originalname);

    const fileUploadOptions = {
      destination: `${folder}/${fileName}`, // Specify the folder in Firebase Storage
    };

    try {
      bucket
        .file(fileUploadOptions.destination)
        .createWriteStream()
        .end(file.buffer);
    } catch (err) {
      throw new ServiceUnavailableException(
        'This service is unavailable at the moment',
      );
    }

    // await bucket.upload(file.buffer, fileUploadOptions);
    // Get the URL of the uploaded file
    const [url] = await bucket.file(`${folder}/${fileName}`).getSignedUrl({
      action: 'read',
      expires: '01-01-2030', // Set an expiration date for the URL
    });

    return url;
  }

  async deleteFile(path: string) {
    const bucket = admin.storage().bucket();
    try {
      await bucket.file(path).delete();
    } catch (err) {
      throw new ServiceUnavailableException(
        'This service is unavailable at the moment',
      );
    }
  }
}
