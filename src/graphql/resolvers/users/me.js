const User = require('../../../models/user');

const me = async (parent, data, context) => {
  if (!context.isAuth) {
    throw new Error('No Authorize!');
  }

  const user = await User.findOne({
    _id: context.userId,
    active: true,
  });

  if (!user) {
    throw new Error('No Authorize!');
  }

  return user;
};
module.exports = { me };
