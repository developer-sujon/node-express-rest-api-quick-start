const detailsJoinService = async (dataModel, matchQuery, joinStage, projection, replaceProperty) => {
  if (replaceProperty) {
    return await dataModel.aggregate([matchQuery, joinStage, replaceProperty, projection]);
  }
  return await dataModel.aggregate([matchQuery, joinStage, projection]);
};

module.exports = detailsJoinService;
