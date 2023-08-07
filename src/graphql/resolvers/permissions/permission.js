const Permission = require('../../../models/permission');

const permission = async (parent, { id }) => {
  const permissionData = await Permission.findOne({ _id: id });

  return permissionData;
};

module.exports = { permission };
