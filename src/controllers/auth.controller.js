const mongoose = require('mongoose');

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, commonService } = require('../services');
const { Proprietor, Store } = require('../models');

const register = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const proprietorCreate = await commonService.createService(Proprietor, false, {}, null, req.body, session);
    const storeCreate = await commonService.createService(
      Store,
      false,
      {},
      null,
      {
        ...req.body,
        proprietorID: proprietorCreate._id,
      },
      session
    );

    const user = await userService.createUser(
      { proprietorID: proprietorCreate._id, storeID: storeCreate._id, ...req.body },
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(httpStatus.CREATED).send({ message: req.t('Registration Successful') });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const login = catchAsync(async (req, res) => {
  const { mobile, password } = req.body;
  const user = await authService.loginUserWithMobileAndPassword(mobile, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.params.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
