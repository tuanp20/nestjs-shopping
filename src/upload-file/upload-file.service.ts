import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileImage, FileImageDocument } from './schemas/file-image.schema';
import { CreateFileImageDTO } from './dtos/create-file-image.dto';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectModel('FileImage')
    private readonly fileImageModel: Model<FileImageDocument>,
  ) {}

  async addImage(file: Express.Multer.File): Promise<FileImage> {
    const newImage = await this.fileImageModel.create(file);
    return newImage;
  }

  // async getImage(fileName: string): Promise<FileImage>{

  // }
}
