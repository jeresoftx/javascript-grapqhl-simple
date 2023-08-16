const { addRole } = require('./addRole');
const { editRole } = require('./editRole');
const { deleteRole } = require('./deleteRole');
const { addPermissionToRole } = require('./addPermissionToRole');
const { removePermissionToRole } = require('./removePermissionToRole');

module.exports = {
  addRole,
  editRole,
  deleteRole,
  addPermissionToRole,
  removePermissionToRole,
};
