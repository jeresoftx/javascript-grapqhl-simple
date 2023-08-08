/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const Role = require('../../../models/role');
const Permission = require('../../../models/permission');

const removePermissionToRole = async (parent, { idRole, idPermission }) => {
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
  const foundPermission = role.permissions.findIndex(
    (element) => element._id.toString() === idPermission,
  );

  if (foundPermission === -1) {
    return role;
  }
  // remove the role
  role.permissions.splice(foundPermission, 1);

  await role.save();
  return role;
};

module.exports = { removePermissionToRole };
