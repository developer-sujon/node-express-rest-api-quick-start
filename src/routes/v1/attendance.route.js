//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, accessPermission } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const attendanceValidation = require('../../validations/attendance.validation');
const attendanceController = require('../../controllers/attendance.controller');

const router = express.Router();

router.post(
  '/attendanceCreate',
  auth(['staff']),
  accessPermission('attendanceCreate'),
  validate(attendanceValidation.attendanceCreate),
  attendanceController.attendanceCreate
);

router.get('/attendanceList', attendanceController.attendanceList);

router.get(
  '/attendanceDetails/:id',
  validate(attendanceValidation.attendanceDetails),
  attendanceController.attendanceDetails
);

router.patch(
  '/attendanceUpdate/:id',
  validate(attendanceValidation.attendanceUpdate),
  attendanceController.attendanceUpdate
);

router.delete(
  '/attendanceDelete/:id',
  validate(attendanceValidation.attendanceDelete),
  attendanceController.attendanceDelete
);

module.exports = router;
