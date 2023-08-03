/* eslint-disable import/no-extraneous-dependencies */
const http = require('http');
const express = require('express');
const { config } = require('dotenv');

const pjson = require('../package.json');
const { logger } = require('./utils/logger');
const { getApolloServer } = require('./graphql/server');

config();
const runServer = async () => {
  const apollo = await getApolloServer();
  await apollo.start();

  const app = express();
  apollo.applyMiddleware({ app, path: '/' });

  const server = http.createServer(app);
  server.listen(process.env.GRAPHQL_PORT, () => {
    logger.info(`${pjson.name} - ${pjson.version}`);
    logger.info('🚀 Server ready at');
    logger.info(`http://${process.env.HOSTNAME}:${process.env.GRAPHQL_PORT}/`);
  });
};

runServer();
