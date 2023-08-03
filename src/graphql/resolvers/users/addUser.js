const User = require('../../../models/user');

const addUser = async (parent, data) => {
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
