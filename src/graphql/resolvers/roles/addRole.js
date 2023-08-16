const { isAuthorized } = require('../../../middleware/isAuthorized');
const Role = require('../../../models/role');

const addRole = async (parent, data, context) => {
  isAuthorized(context);
  const role = new Role(data);
  await role.save();
  return role;
};

module.exports = { addRole };
