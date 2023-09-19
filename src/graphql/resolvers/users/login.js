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
  }).exec();

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

  const tokenJWT = jwt.sign(
    { userId: user.id, username },
    process.env.JWTSECRET,
    {
      expiresIn,
    },
  );

  const tokenData = {
    expiresIn,
    userAgent: context.userAgent,
    type: 'LOGIN',
    token: tokenJWT,
    userId: user.id,
  };
  const token = new Token(tokenData);

  await token.save();

  return tokenJWT;
};

module.exports = { login };
