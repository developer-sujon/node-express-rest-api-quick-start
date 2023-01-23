//External Lib Import
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const listService = async (request, dataModel) => {
  const proprietorId = request.proprietorId;
  const storeId = request.storeId;

  return await dataModel.aggregate([
    {
      $match: {
        proprietorId: new ObjectId(proprietorId),
        storeId: new ObjectId(storeId),
      },
    },
  ]);
};

module.exports = listService;
