//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../../utils/ApiError');

const updateService = async (dataModel, matchQuery, postBody, notFoundErrorMessage) => {
  const data = await dataModel.findOne(matchQuery);
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, notFoundErrorMessage);
  }
  Object.assign(data, postBody);
  return await data.save();
};

module.exports = updateService;
