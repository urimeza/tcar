import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class VerifyAccessTokens implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      res.locals.user = user;

      next();
    } catch (error) {
      // console.log(error);
      console.log('Invalid access token');
      res.status(403).send('Invalid access token');
    }
  }
}

@Injectable()
export class VerifyRefreshTokens implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      res.locals.user = user;

      next();
    } catch (error) {
      console.log('Invalid refresh token');
      res.clearCookie('refreshToken').sendStatus(403);
    }
  }
}
