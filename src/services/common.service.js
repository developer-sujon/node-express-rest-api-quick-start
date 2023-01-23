//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../utils/ApiError');

const createService = async (dataModel, unique, uniqueValue, errorMessage, postBody) => {
  const uniqueData = await dataModel.aggregate([{ $match: uniqueValue }]);

  if (unique && uniqueData.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  const data = new dataModel(postBody);
  return await data.save();
};

const listService = async (dataModel, matchQuery, projection) => {
  return await dataModel.aggregate([
    matchQuery,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

const listOneJoinService = async (dataModel, matchQuery, joinStage, projection) => {
  return await dataModel.aggregate([
    matchQuery,
    joinStage,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

const updateService = async (dataModel, matchQuery, postBody, errorMessage) => {
  const data = await dataModel.findOne(matchQuery);

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  Object.assign(data, postBody);
  return await data.save();
};

const deleteService = async (dataModel, matchQuery, errorMessage) => {
  const data = await dataModel.findOne(matchQuery);

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }
  return await dataModel.deleteMany(matchQuery);
};

module.exports = {
  createService,
  listService,
  listOneJoinService,
  updateService,
  deleteService,
};
