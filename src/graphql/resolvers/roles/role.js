const { isAuthorized } = require('../../../middleware/isAuthorized');
const Role = require('../../../models/role');

const role = async (parent, { id }, context) => {
  isAuthorized(context);
  const roleData = await Role.findOne({ _id: id });

  return roleData;
};

module.exports = { role };
