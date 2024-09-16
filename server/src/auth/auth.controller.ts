import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import cookiesConfig from '../../config/cookiesConfig';
import generateTokens from 'utils/generateTokens';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Req() req, @Res() res) {
    try {
      const data = await this.authService.signUp(req, res);
      console.log(321);
      
      res
        .cookie('refreshToken', data.refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken: data.accessToken, user: data.plainUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }

  @Post('login')
  async login(@Req() req, @Res() res) {
    try {
      const data = await this.authService.login(req, res);
      res
        .cookie('refreshToken', data.refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken: data.accessToken, user: data.plainUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }

  @Get('logout')
  async logout(@Res() res) {
    try {
      res.clearCookie('refreshToken').sendStatus(200);
    } catch (error) {
      console.log(error);
      
    }
  }

  @Get('tokens/refresh')
  async tokensRefresh(@Req() req, @Res() res) {
    try {
      const { accessToken, refreshToken } = generateTokens({
        user: res.locals.user,
      });
      res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: res.locals.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }
}
