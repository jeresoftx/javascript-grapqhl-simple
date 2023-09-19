/* eslint-disable import/no-extraneous-dependencies */
const Dayjs = require('dayjs');

const { isAuthorized } = require('../../../middleware/isAuthorized');
const User = require('../../../models/user');

const deleteUser = async (parent, { id }, context) => {
  await isAuthorized(context);
  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    return false;
  }
  const timestamp = Dayjs().toDate().getTime();
  user.username = `${user.username}-${timestamp}`;
  user.active = false;
  await user.save();
  return true;
};

module.exports = { deleteUser };
