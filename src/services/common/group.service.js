const groupService = async (dataModel, matchQuery, groupBy) => {
  return await dataModel.aggregate([matchQuery, groupBy]);
};

module.exports = groupService;
