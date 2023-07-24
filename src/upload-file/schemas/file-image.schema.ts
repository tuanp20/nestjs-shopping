import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type FileImageDocument = FileImage & Document;

@Schema({ timestamps: true })
export class FileImage {
  @Prop()
  fieldname: string;
  @Prop()
  originalname: string;
  @Prop()
  mimetype: string;
  @Prop()
  path: string;
  @Prop()
  size: number;
}

export const FileImageSchema = SchemaFactory.createForClass(FileImage);
