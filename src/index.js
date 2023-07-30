/* eslint-disable import/no-extraneous-dependencies */
const http = require('http');
const express = require('express');
const { config } = require('dotenv');
const pino = require('pino');

const pjson = require('../package.json');
const { getApolloServer } = require('./graphql/server');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});
config();
const runServer = async () => {
  const apollo = getApolloServer();
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
