import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import { LogInWithCredentialsGuard } from './login-with-credentials.guard';
import RequestWithUser from './request-with-user.interface';
import { CookieAuthenticationGuard } from './cookie-authentication.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import LogInDto from './dto/login.dto';

@Controller('authentication')
@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LogInWithCredentialsGuard)
  @ApiBody({ type: LogInDto })
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    request.logOut(() => {
      request.session.cookie.maxAge = 0;
    });
  }
}
