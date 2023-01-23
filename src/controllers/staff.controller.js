//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { Staff } = require('../models');
const { commonService } = require('../services');

/**
 * @desc staff create
 * @access private
 * @route /api/v1/staff/staffCreate
 * @methud POST
 */

const staffCreate = catchAsync(async (req, res) => {
  const unique = false;
  const uniqueValue = {};
  const errorMessage = '';

  await commonService.createService(Staff, unique, uniqueValue, errorMessage, req.body);
  res.json({ message: 'staff Create Successfully' });
});

/**
 * @desc staff list
 * @access private
 * @route /api/v1/staff/staffList
 * @methud GET
 */

const staffList = catchAsync(async (req, res) => {
  const matchQuery = {
    $match: {},
  };
  const projection = {
    $project: {
      _id: 1,
      name: 1,
      email: 1,
      photoDescriptor: 1,
    },
  };

  const data = await commonService.listService(Staff, matchQuery, projection);
  res.json(data);
});

module.exports = {
  staffCreate,
  staffList,
};
