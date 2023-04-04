const listService = async (dataModel, matchQuery, projection, sort) => {
  sort = sort || {
    $sort: {
      _id: -1,
    },
  };
  return await dataModel.aggregate([matchQuery, projection, sort]);
};

module.exports = listService;
