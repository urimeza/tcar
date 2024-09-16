import jwtConfig from "./jwtConfig";

const cookiesConfig = {
  refresh: {
    httpOnly: true,
    maxAge: jwtConfig.refresh.expiresIn,
    sameSite: 'none',
    secure: true,
  },
  access: {
    httpOnly: true,
    maxAge: jwtConfig.access.expiresIn,
  },
};

export default cookiesConfig;
