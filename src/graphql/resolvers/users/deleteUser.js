/* eslint-disable import/no-extraneous-dependencies */
const Dayjs = require('dayjs');

const User = require('../../../models/user');

const deleteUser = async (parent, { id }) => {
  const user = await User.findOne({ _id: id });
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
