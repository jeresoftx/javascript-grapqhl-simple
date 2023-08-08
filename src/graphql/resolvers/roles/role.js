const Role = require('../../../models/role');

const role = async (parent, { id }) => {
  const roleData = await Role.findOne({ _id: id });

  return roleData;
};

module.exports = { role };
