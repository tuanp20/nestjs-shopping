import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  clientToUser = {};

  async create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messageModel.create(message);
    return message;
  }

  async findAll(): Promise<Message[]> {
    const messages = await this.messageModel.find().exec();
    return messages;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  async getClientByName(clientId: string) {
    return await this.clientToUser[clientId];
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
