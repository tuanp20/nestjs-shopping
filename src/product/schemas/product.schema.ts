import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  image: string;
  @Prop()
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
