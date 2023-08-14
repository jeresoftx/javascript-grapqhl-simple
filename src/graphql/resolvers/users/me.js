const User = require('../../../models/user');

module.exports = async (parent, data, context) => {
  if (!context.isAuth) {
    throw new Error('Token has expired!');
  }

  const user = await User.findOne({
    _id: context.userId,
    active: true,
  });

  return user;
};
