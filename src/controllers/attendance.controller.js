//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { Attendance } = require('../models');
const { commonService } = require('../services');

/**
 * @desc attendance create
 * @access private
 * @route /api/v1/attendance/attendanceCreate
 * @methud POST
 */

const attendanceCreate = catchAsync(async (req, res) => {
  const unique = false;
  const uniqueValue = {};
  const errorMessage = '';

  await commonService.createService(Attendance, unique, uniqueValue, errorMessage, req.body);
  res.json({ message: 'Attendance Successfully' });
});

/**
 * @desc attendance list
 * @access private
 * @route /api/v1/attendance/attendanceList
 * @methud GET
 */

const attendanceList = catchAsync(async (req, res) => {
  const matchQuery = {
    $match: {},
  };
  const joinStage = {
    $lookup: {
      from: 'staffs',
      localField: 'staffID',
      foreignField: '_id',
      as: 'staff',
    },
  };

  const projection = {
    $project: {
      _id: 1,
      name: { $first: '$staff.name' },
      email: { $first: '$staff.email' },
      photoDescriptor: 1,
    },
  };

  const data = await commonService.listOneJoinService(Attendance, matchQuery, joinStage, projection);
  res.json(data);
});

/**
 * @desc attendance details
 * @access private
 * @route /api/v1/attendance/attendanceDetails/:id
 * @methud GET
 */

const attendanceDetails = catchAsync(async (req, res) => {
  const matchQuery = {
    $match: {
      _id: ObjectId(req.params.id),
    },
  };
  const joinStage = {
    $lookup: {
      from: 'staffs',
      localField: 'staffID',
      foreignField: '_id',
      as: 'staff',
    },
  };

  const projection = {
    $project: {
      _id: 1,
      name: { $first: '$staff.name' },
      email: { $first: '$staff.email' },
      photoDescriptor: 1,
    },
  };

  const data = await commonService.listOneJoinService(Attendance, matchQuery, joinStage, projection);
  res.json(data);
});

/**
 * @desc attendance update
 * @access private
 * @route /api/v1/attendance/attendanceUpdate/:id
 * @methud PATCH
 */

const attendanceUpdate = catchAsync(async (req, res) => {
  const matchQuery = {
    _id: req.params.id,
  };
  const errorMessage = 'Attendance not found';

  await commonService.updateService(Attendance, matchQuery, req.body, errorMessage);
  res.json({ message: 'Attendance Update Successfull' });
});

/**
 * @desc attendance delete
 * @access private
 * @route /api/v1/attendance/attendanceDelete/:id
 * @methud DELETE
 */

const attendanceDelete = catchAsync(async (req, res) => {
  const matchQuery = {
    _id: req.params.id,
  };
  const errorMessage = 'Attendance not found';

  await commonService.deleteService(Attendance, matchQuery, errorMessage);
  res.json({ message: 'Attendance Remove Successfull' });
});

module.exports = {
  attendanceCreate,
  attendanceList,
  attendanceDetails,
  attendanceUpdate,
  attendanceDelete,
};
