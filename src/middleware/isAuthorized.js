const Role = require('../models/role');

const isAuthorized = async (data) => {
  if (!data.context.isAuth || !data.context.roles) {
    throw new Error('Unauthorized!');
  }
  // check the permission
  const superAdminIndex = data.context.roles.findIndex((role) => role === '*');
  if (superAdminIndex === -1) {
    const roles = await Role.find({
      name: { $in: data.context.roles },
      active: true,
    });
    let havePermission = false;
    if (roles.length > 0) {
      roles.forEach((role) => {
        if (role.permissions.length > 0) {
          role.permissions.forEach((permission) => {
            if (
              permission.permission === data.context.operation
              || permission.permission === '*'
            ) {
              havePermission = true;
            }
          });
        }
      });
    }
    if (!havePermission) {
      throw new Error('Unauthorized!');
    }
  }

  return true;
};

module.exports = { isAuthorized };
