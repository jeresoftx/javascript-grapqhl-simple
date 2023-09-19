const { isAuthorized } = require('../../../middleware/isAuthorized');
const User = require('../../../models/user');

const user = async (parent, { id }, context) => {
  await isAuthorized(context);
  const userData = await User.findOne({ _id: id }).exec();

  return userData;
};

module.exports = { user };
