const checkAssociateService = async (associateModel, matchObject) => {
  return (await associateModel.find(matchObject).length) > 0;
};

export default checkAssociateService;
