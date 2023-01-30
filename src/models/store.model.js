//External Lib Import
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const storeSchema = mongoose.Schema(
  {
    proprietorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proprietor',
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    mobile: {
      type: String,
      validate(value) {
        if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
          throw new Error('Please enter the correct number');
        }
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    storePhoto: {
      type: Object,
      default: null,
    },
    address: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    thana: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    storeSettings: {
      type: Object,
      default: {},
    },
    ASSettings: {
      installationCharge: {
        type: Number,
        required: true,
        default: 30000,
      },
      monthlyServiceCharge: {
        type: Number,
        required: true,
        default: 1000,
      },
      UISettings: {
        warranty: {
          type: Boolean,
          default: false,
        },
      },
    },
    storeStatus: {
      type: String,
      required: true,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
    storePaymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

/**
 * @typedef store
 */
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
