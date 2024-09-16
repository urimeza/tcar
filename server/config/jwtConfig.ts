const jwtConfig = {
  access: {
    expiresIn: `${1000 * 20}`,
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 12}`,
  },
};

export default jwtConfig;
