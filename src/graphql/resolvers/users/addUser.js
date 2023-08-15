const { isAuthorized } = require('../../../middleware/isAuthorized');
const User = require('../../../models/user');

const addUser = async (parent, data, context) => {
  isAuthorized(context);
  const userData = {
    ...data,
    fullName: `${data.name} ${data.lastName}`,
    phones: [{ phone: data.phone, main: true }],
    emails: [{ email: data.email, main: true }],
  };
  const user = new User(userData);
  await user.save();
  return user;
};

module.exports = { addUser };
