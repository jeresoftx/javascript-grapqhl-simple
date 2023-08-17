const { addUser } = require('./addUser');
const { deleteUser } = require('./deleteUser');
const { editUser } = require('./editUser');
const { login } = require('./login');
const { logout } = require('./logout');

module.exports = {
  addUser,
  deleteUser,
  editUser,
  login,
  logout,
};
