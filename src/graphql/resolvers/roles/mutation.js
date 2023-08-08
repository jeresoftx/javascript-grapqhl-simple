const { addRole } = require('./addRole');
const { updateRole } = require('./updateRole');
const { deleteRole } = require('./deleteRole');
const { addPermissionToRole } = require('./addPermissionToRole');
const { removePermissionToRole } = require('./removePermissionToRole');

module.exports = {
  addRole,
  updateRole,
  deleteRole,
  addPermissionToRole,
  removePermissionToRole,
};
