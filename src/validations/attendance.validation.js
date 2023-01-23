const Joi = require('joi');
const { objectId } = require('./custom.validation');

const attendanceCreate = {
  body: Joi.object().keys({
    staffID: Joi.string().required().custom(objectId),
    photoDescriptor: Joi.string().required(),
  }),
};

const attendanceDetails = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const attendanceUpdate = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    photoDescriptor: Joi.string().required(),
  }),
};

const attendanceDelete = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  attendanceCreate,
  attendanceDetails,
  attendanceUpdate,
  attendanceDelete,
};
