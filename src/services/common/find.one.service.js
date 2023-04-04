const findOneService = (dataModel, matchQuery, projection) => {
  return dataModel.findOne(matchQuery).select(projection);
};

module.exports = findOneService;
