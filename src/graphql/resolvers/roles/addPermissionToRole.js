/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Role = require('../../../models/role');
const Permission = require('../../../models/permission');

const addPermissionToRole = async (parent, { idRole, idPermission }) => {
  const role = await Role.findOne({ _id: idRole });
  if (!role) {
    throw new Error(`INFO | The role with ${idRole} doesn't exists!`);
  }
  const permission = await Permission.findOne({ _id: idPermission });
  if (!permission) {
    throw new Error(
      `INFO | The permission with ${idPermission} doesn't exists!`,
    );
  }

  // check if permission exists
  if (role.permissions.length > 0) {
    const foundPermission = role.permissions.findIndex(
      (element) => element._id.toString() === idPermission,
    );
    if (foundPermission !== -1) {
      return role;
    }
  }

  // add the role
  role.permissions.push({ _id: permission.id, name: permission.name });
  console.log(role.permissions);
  await role.save();
  return role;
};

module.exports = { addPermissionToRole };
