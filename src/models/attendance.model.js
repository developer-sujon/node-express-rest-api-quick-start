//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const attendanceSchema = mongoose.Schema(
  {
    staffID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'staff',
    },
    photoDescriptor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
attendanceSchema.plugin(toJSON);
attendanceSchema.plugin(paginate);

/**
 * @typedef attendance
 */
const attendance = mongoose.model('attendance', attendanceSchema);

module.exports = attendance;
