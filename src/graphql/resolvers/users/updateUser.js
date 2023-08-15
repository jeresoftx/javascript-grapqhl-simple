/* eslint-disable import/no-extraneous-dependencies */
const { isAuthorized } = require('../../../middleware/isAuthorized');
const User = require('../../../models/user');

const updateUser = async (parent, data, context) => {
  isAuthorized(context);
  const { id, name, lastName } = data;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return null;
  }

  user.name = name;
  user.lastName = lastName;

  await user.save();
  return user;
};

module.exports = { updateUser };
