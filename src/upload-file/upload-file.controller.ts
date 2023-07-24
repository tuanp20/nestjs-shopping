import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadFileService } from './upload-file.service';
import { CreateFileImageDTO } from './dtos/create-file-image.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

interface FileParams {
  fileName: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    const newFileImage = await this.uploadFileService.addImage(file);
    return newFileImage;
  }

  @Get('/getFile')
  getFile(@Res() res: Response, @Body() file: FileParams) {
    console.log(11, path.join(__dirname, '../tmp/my-uploads/' + file.fileName));
    res.sendFile(path.join(__dirname, '../tmp/my-uploads/' + file.fileName));
  }
}
