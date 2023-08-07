const Permission = require('../../../models/permission');

const addPermission = async (parent, data) => {
  const permission = new Permission(data);
  await permission.save();
  return permission;
};

module.exports = { addPermission };
