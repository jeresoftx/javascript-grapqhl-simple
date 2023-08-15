const User = require('../../../models/user');

const me = async (parent, data, context) => {
  if (!context.isAuth) {
    throw new Error('No Authorize!');
  }
  console.log(context.user);
  const user = await User.findOne({
    _id: context.user.id,
    active: true,
  });

  if (!user) {
    throw new Error('No Authorize!');
  }

  return user;
};
module.exports = { me };
