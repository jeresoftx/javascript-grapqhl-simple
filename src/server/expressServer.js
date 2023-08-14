/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { apolloServer } = require('./apolloServer');

const { auth } = require('../middleware/auth');
const { connectDB, disconnectDB } = require('../db/connectDB');

const expressServer = async ({ url }) => {
  await connectDB({ url });
  const apollo = await apolloServer();
  await apollo.start();

  const app = express();
  app.use(auth);
  apollo.applyMiddleware({ app, path: '/' });
  return { app, apollo };
};

const closeExpressServer = async () => {
  await disconnectDB();
};

module.exports = { expressServer, closeExpressServer };
