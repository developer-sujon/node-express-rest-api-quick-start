//External Lib Import
const passport = require('passport');
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../utils/ApiError');
const { Staff } = require('../models');

const verifyCallback = (req, resolve, reject, roles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (roles.indexOf(user.role) === -1) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden'));
  }

  resolve();
};

const auth = (roles) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, roles))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

const accessPermission = (routePermission) => async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      let permissions = {};

      if (req.user.role === 'staff') {
        permissions = await Staff.findOne({ userID: req.user._id }).select('permissions');
      }

      if (permissions.permissions[routePermission]) {
        return next();
      }

      throw new ApiError(httpStatus.UNAUTHORIZED, `You don't have permission to this route`);
    }
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  accessPermission,
};
