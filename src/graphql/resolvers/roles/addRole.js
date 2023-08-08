const Role = require('../../../models/role');

const addRole = async (parent, data) => {
  const role = new Role(data);
  await role.save();
  return role;
};

module.exports = { addRole };
