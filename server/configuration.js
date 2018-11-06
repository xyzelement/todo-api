module.exports = {
  //TODO: fail here if default kicks in production
  JWT_SECRET: process.env.JWT_SECRET || "MY AWFUL SECRET"
};
