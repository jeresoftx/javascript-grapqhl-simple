const { isAuthorized } = require('../../../middleware/isAuthorized');
const Permission = require('../../../models/permission');

const addPermission = async (parent, data, context) => {
  isAuthorized(context);
  const permission = new Permission(data);
  await permission.save();
  return permission;
};

module.exports = { addPermission };
