// const jwt = require('jsonwebtoken');
// const jwtConfig = require('../config/jwtConfig');

// require('dotenv').config();
import jwtConfig from 'config/jwtConfig';
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

function generateTokens(payload) {
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: jwtConfig.access.expiresIn,
    }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: jwtConfig.refresh.expiresIn,
    }),
  };
}

export default generateTokens;
