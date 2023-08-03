import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Response,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { CreateUserDTO } from 'src/user/dtos/create-user-dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from 'src/user/dtos/login-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  // @UseGuards(LocalAuthGuard)
  // @Get('/logout')
  // logout(@Request() req): any {
  //   console.log('req.cookie', req.cookie);
  //   // req.session.destroy();
  //   return { msg: 'The user session has ended' };
  // }

  @Get('logout')
  logout(@Request() req: Request, @Response() res: Response) {
    // this.authService.logout(req);
  }

  @Post('/refresh-token')
  async refresh(@Body() body) {
    const { userId, refreshToken } = body;
    const decodedRefreshToken = await this.authService.verifyRefreshToken(
      userId,
      refreshToken,
    );
    return { decodedRefreshToken };
  }

  @Get('/google')
  @UseGuards(AuthGuard('/google'))
  async googleAuth(@Request() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}
