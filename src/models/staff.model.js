//External Lib Import
const mongoose = require('mongoose');
const validator = require('validator');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');
const permissions = require('../config/permissions');

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    photoDescriptor: {
      type: String,
      required: true,
    },
    permissions: permissions,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
staffSchema.plugin(toJSON);
staffSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The staff's email
 * @param {ObjectId} [excludestaffId] - The id of the staff to be excluded
 * @returns {Promise<boolean>}
 */
staffSchema.statics.isEmailTaken = async function (email, excludestaffId) {
  const staff = await this.findOne({ email, _id: { $ne: excludestaffId } });
  return !!staff;
};

/**
 * @typedef staff
 */
const staff = mongoose.model('Staff', staffSchema);

module.exports = staff;
