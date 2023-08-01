import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dtos/update-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const userExists = await this.userModel.findOne({
      username: createUserDTO.username,
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  // async updateRefreshToken(userId: string, refreshToken: string) {
  //   const hashedRefreshToken = await this.hashData(refreshToken);
  //   await this.usersService.update(userId, {
  //     refreshToken: hashedRefreshToken,
  //   });
  // }
}
