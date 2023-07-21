import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadFileService } from './upload-file.service';
import { CreateFileImageDTO } from './dtos/create-file-image.dto';

interface FileParams {
  fileName: string;
}

@Controller('upload-file')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp/my-uploads',
        filename: (req, file, res) => {
          res(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: CreateFileImageDTO) {
    const newFileImage = await this.uploadFileService.addImage(file);
    return newFileImage;
  }

  @Get('/getFile')
  getFile(@Res() res: Response, @Body() file: FileParams) {
    console.log(11, path.join(__dirname, '../tmp/my-uploads/' + file.fileName))
    res.sendFile(path.join(__dirname, '../tmp/my-uploads/' + file.fileName));
  }
}
