//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { Role } = require('../models');
const { commonService } = require('../services');

/**
 * @desc role create
 * @returns {Promise<Role>}
 */

const roleCreate = (request) => {
  const { proprietorID, storeID } = request.user;
  const postBody = {
    proprietorID,
    storeID,
    ...request.body,
  };
  const unique = false;
  const uniqueValue = {};
  const errorMessage = '';

  return commonService.createService(Role, unique, uniqueValue, errorMessage, postBody);
};

/**
 * @desc role dropDown
 * @returns {Promise<Role>}
 */

const roleDropDown = (request) => {
  const { proprietorID, storeID } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      storeID: ObjectId(storeID),
      status: true,
    },
  };

  const projection = {
    $project: {
      proprietorID: 0,
      storeID: 0,
    },
  };

  return commonService.listService(Role, matchQuery, projection);
};

/**
 * @desc role list
 * @returns {Promise<Role>}
 */

const roleList = (request) => {
  const { proprietorID, storeID } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      storeID: ObjectId(storeID),
    },
  };

  const projection = {
    $project: {
      proprietorID: 0,
      storeID: 0,
    },
  };

  return commonService.listService(Role, matchQuery, projection);
};

/**
 * @desc role details
 * @returns {Promise<Role>}
 */

const roleDetails = (request) => {
  const { proprietorID, storeID } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      storeID: ObjectId(storeID),
      _id: ObjectId(request.params.id),
    },
  };

  const projection = {
    $project: {
      proprietorID: 0,
      storeID: 0,
    },
  };

  return commonService.detailsService(Role, matchQuery, projection);
};

/**
 * @desc role update
 * @returns {Promise<Role>}
 */

const roleUpdate = (request) => {
  const { proprietorID, storeID } = request.user;

  const matchQuery = {
    proprietorID: ObjectId(proprietorID),
    storeID: ObjectId(storeID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = 'Role not found';
  return commonService.updateService(Role, matchQuery, request.body, errorMessage);
};

/**
 * @desc role delete
 * @returns {Promise<Role>}
 */

const roleDelete = (request) => {
  const { proprietorID, storeID } = request.user;

  const matchQuery = {
    proprietorID: ObjectId(proprietorID),
    storeID: ObjectId(storeID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = 'Role not found';
  return commonService.deleteService(Role, matchQuery, errorMessage);
};

module.exports = {
  roleCreate,
  roleDropDown,
  roleList,
  roleDetails,
  roleUpdate,
  roleDelete,
};
