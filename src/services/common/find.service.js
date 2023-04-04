const findService = (dataModel, matchQuery, projection, sort) => {
  sort = sort || {
    _id: -1,
  };
  return dataModel.find(matchQuery).select(projection).sort(sort);
};

module.exports = findService;
