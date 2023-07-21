import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileImageSchema } from './schemas/file-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FileImage', schema: FileImageSchema }]),
  ],
  providers: [UploadFileService],
  controllers: [UploadFileController],
})
export class UploadFileModule {}
