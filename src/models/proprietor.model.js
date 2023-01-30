//External Lib Import
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const proprietorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      trim: true,
    },
    fatherName: {
      type: String,
      min: 3,
      max: 50,
      trim: true,
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
    photo: {
      type: Object,
      default: null,
    },
    nid: {
      type: String,
      min: 3,
      max: 20,
    },
    remarks: {
      type: String,
      min: 3,
      max: 30,
    },
    reference: {
      name: {
        type: String,
        min: 3,
        max: 30,
        trim: true,
      },
      mobile: {
        type: String,
        validate(value) {
          if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
            throw new Error('Please enter the correct number');
          }
        },
      },
      nid: {
        type: String,
        min: 3,
        max: 20,
      },
      address: {
        type: String,
        min: 3,
        max: 100,
        trim: true,
      },
      relation: {
        type: String,
        min: 3,
        max: 30,
        trim: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
proprietorSchema.plugin(toJSON);
proprietorSchema.plugin(paginate);

/**
 * @typedef proprietor
 */
const Proprietor = mongoose.model('Proprietor', proprietorSchema);

module.exports = Proprietor;
