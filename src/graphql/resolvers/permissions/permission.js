const { isAuthorized } = require('../../../middleware/isAuthorized');
const Permission = require('../../../models/permission');

const permission = async (parent, { id }, context) => {
  isAuthorized(context);
  const permissionData = await Permission.findOne({ _id: id });

  return permissionData;
};

module.exports = { permission };
