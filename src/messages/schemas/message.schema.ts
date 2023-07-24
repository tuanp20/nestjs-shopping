import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop()
    name: string;
    @Prop()
    text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
