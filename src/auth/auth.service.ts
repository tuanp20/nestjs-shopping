import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // 1
import { LoginDTO } from 'src/user/dtos/login-dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    const isPasswordMatch = await bcrypt.compare(password, user?.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(loginDTO: LoginDTO) {
    const user: any = await this.userService.findUser(loginDTO.username);
    if (!user) throw new BadRequestException('User does not exist');

    const tokens = await this.getTokens(user._id, user.username);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return {
      access_token: tokens,
      // refreshToken: this.jwtService.
    };
  }

  async logout(user: any) {
    console.log('user', user);
    // return this.userService.update(userId, {
    //   refreshToken: null,
    // } as UpdateUserDTO);
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    } as UpdateUserDTO);
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
