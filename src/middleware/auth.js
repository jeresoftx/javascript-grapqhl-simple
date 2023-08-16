/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

const User = require('../models/user');
const Token = require('../models/token');

config();

const auth = async (req, res, next) => {
  const context = {
    isAuth: false,
  };
  let authHeader = req.get('Authorization');
  context.userAgent = req.get('user-agent');
  context.ip = req.headers['x-forwarded-for'];
  res.context = context;
  if (!authHeader) {
    return next();
  }

  authHeader = authHeader.split(' ');
  const token = authHeader[1];

  if (!token) {
    return next();
  }

  const tokenData = await Token.findOne({
    token,
    active: true,
  });

  if (!tokenData) {
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWTSECRET);
  } catch (err) {
    tokenData.active = false;
    tokenData.save();
    return next();
  }

  if (tokenData.type !== 'LOGIN' && tokenData.type !== 'APP') {
    tokenData.active = false;
    tokenData.save();
    return next();
  }

  const user = await User.findOne({
    _id: decodedToken.userId,
    active: true,
  });
  context.roles = user.roles;

  await User.updateOne(
    {
      _id: decodedToken.userId,
      active: true,
    },
    {
      lastconnected: new Date(),
    },
  );

  context.isAuth = true;
  context.token = token;
  // eslint-disable-next-line no-underscore-dangle
  context.user = { ...user._doc, id: user.id };
  res.context = context;
  return next();
};

module.exports = { auth };
