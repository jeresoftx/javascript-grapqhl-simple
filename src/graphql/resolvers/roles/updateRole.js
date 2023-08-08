/* eslint-disable import/no-extraneous-dependencies */
const Role = require('../../../models/role');

const updateRole = async (parent, data) => {
  const { id, name, description } = data;
  const role = await Role.findOne({ _id: id });
  if (!role) {
    return null;
  }

  role.name = name;
  role.description = description;

  await role.save();
  return role;
};

module.exports = { updateRole };
