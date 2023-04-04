//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../../utils/ApiError');

const createUniqueService = async (dataModel, uniqueValue, uniqueErorMessage, postBody) => {
  const uniqueData = await dataModel.findOne(uniqueValue);

  if (uniqueData && Object.entries(uniqueData).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, uniqueErorMessage);
  }
  return await new dataModel(postBody).save();
};

module.exports = {
  createUniqueService,
};
