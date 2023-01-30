const Joi = require('joi');
const { password, mobile } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    storeName: Joi.string().min(3).max(50).required(),
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().required().custom(mobile),
    email: Joi.string().required().email(),
    address: Joi.string().min(3).max(100).required(),
    district: Joi.string().min(3).max(30).required(),
    thana: Joi.string().min(3).max(30).required(),
    reference: Joi.object({
      name: Joi.string().min(3).max(30).required(),
      mobile: Joi.string().required().custom(mobile),
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    mobile: Joi.string().required().custom(mobile),
    password: Joi.string().required().custom(password),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  params: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
