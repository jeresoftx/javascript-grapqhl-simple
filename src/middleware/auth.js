/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

const User = require('../models/user');
const Token = require('../models/token');

config();

const auth = async (req, res, next) => {
  let authHeader = req.get('Authorization');
  res.userAgent = req.get('user-agent');
  res.ip = req.headers['x-forwarded-for'];

  if (!authHeader) {
    res.isAuth = false;
    return next();
  }

  authHeader = authHeader.split(' ');
  const token = authHeader[1];

  if (!token) {
    res.isAuth = false;
    return next();
  }

  const tokenData = await Token.findOne({
    token,
    active: true,
  });

  if (!tokenData) {
    res.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWTSECRET);
  } catch (err) {
    tokenData.active = false;
    tokenData.save();
    res.isAuth = false;
    return next();
  }

  if (tokenData.type !== 'LOGIN' && tokenData.type !== 'APP') {
    tokenData.active = false;
    tokenData.save();
    res.isAuth = false;
    return next();
  }

  await User.updateOne(
    {
      _id: decodedToken.userId,
      active: true,
    },
    {
      lastconnected: new Date(),
    },
  );

  res.isAuth = true;
  res.userId = decodedToken.userId;
  res.token = token;
  return next();
};

module.exports = { auth };
