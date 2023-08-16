const Role = require('../models/role');

const isAuthorized = async (context) => {
  if (!context.isAuth || !context.roles) {
    throw new Error('Unauthorized!');
  }
  // check the permission
  const superAdminIndex = context.roles.findIndex((role) => role === '*');
  if (superAdminIndex === -1) {
    const roles = await Role.find({
      name: { $in: context.roles },
      active: true,
    });
    let havePermission = false;
    if (roles.length > 0) {
      roles.forEach((role) => {
        if (role.permissions.length > 0) {
          role.permissions.forEach((permission) => {
            if (
              // eslint-disable-next-line operator-linebreak
              permission.permission === context.operation ||
              permission.permission === '*'
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
