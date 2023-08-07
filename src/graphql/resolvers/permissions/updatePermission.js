/* eslint-disable import/no-extraneous-dependencies */
const Permission = require('../../../models/permission');

const updatePermission = async (parent, data) => {
  const { id, name, description } = data;
  const permission = await Permission.findOne({ _id: id });
  if (!permission) {
    return null;
  }

  permission.name = name;
  permission.description = description;

  await permission.save();
  return permission;
};

module.exports = { updatePermission };