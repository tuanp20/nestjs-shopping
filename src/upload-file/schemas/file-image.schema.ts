import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type FileImageDocument = FileImage & Document;

@Schema({ timestamps: true })
export class FileImage {
  @Prop()
  originalname: string;
  @Prop()
  path: string;
}

export const FileImageSchema = SchemaFactory.createForClass(FileImage);
