//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../../utils/ApiError');

const deleteService = async (dataModel, matchQuery, notFoundErrorMessage) => {
  const data = await dataModel.findOne(matchQuery);
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, notFoundErrorMessage);
  }
  await dataModel.deleteMany(matchQuery);
  return data;
};

module.exports = deleteService;
