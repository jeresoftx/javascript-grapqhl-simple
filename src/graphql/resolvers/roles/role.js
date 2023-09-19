const { isAuthorized } = require('../../../middleware/isAuthorized');
const Role = require('../../../models/role');

const role = async (parent, { id }, context) => {
  await isAuthorized(context);
  const roleData = await Role.findOne({ _id: id }).exec();

  return roleData;
};

module.exports = { role };
