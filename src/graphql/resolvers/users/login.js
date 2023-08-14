const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

const User = require('../../../models/user');
const Token = require('../../../models/token');

config();

const login = async (parent, data, context) => {
  const { username, password, remember } = data;
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
    active: true,
  });
  if (!user) {
    throw new Error('INFO | Login error!');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('INFO | Login error!');
  }

  let expiresIn = '24h';
  if (remember) {
    expiresIn = '30d';
  }

  const token = jwt.sign({ userId: user.id, username }, process.env.JWTSECRET, {
    expiresIn,
  });

  await Token.create({
    token,
    expiresIn,
    type: 'LOGIN',
    userAgent: context.userAgent,
    userId: user.id,
  });

  return token;
};

module.exports = { login };
