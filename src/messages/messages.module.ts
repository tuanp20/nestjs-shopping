import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
