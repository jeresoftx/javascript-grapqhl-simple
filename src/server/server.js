/* eslint-disable import/no-extraneous-dependencies */

const { readFileSync } = require('fs');
const http = require('http');
const { config } = require('dotenv');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { scalarTypeDefs } = require('graphql-scalars');

const resolvers = require('../graphql/resolvers/resolvers');
const { auth } = require('../middleware/auth');
const { connectDB, disconnectDB } = require('../db/connectDB');
const { logger } = require('../utils/logger');
const pjson = require('../../package.json');

config();

const expressServer = async ({ url }) => {
  await connectDB({ url });
  const app = express();

  app.use(auth);
  const myTypeDefs = readFileSync(
    __dirname.concat('/../graphql/schema.graphql'),
  ).toString();

  const apollo = new ApolloServer({
    typeDefs: [scalarTypeDefs, myTypeDefs],
    resolvers,
    introspection: true,
    context: ({ req, res }) => {
      const obj = gql`
        ${req.body.query}
      `;
      // eslint-disable-next-line operator-linebreak
      const operation =
        obj.definitions[0].selectionSet.selections[0].name.value;
      return {
        ...res.context,
        operation,
      };
    },
  });
  await apollo.start();
  apollo.applyMiddleware({ app, path: '/' });
  return app;
};

const sartServer = async ({ url }) => {
  const app = await expressServer({ url });
  const proxy = http.createServer(app);

  proxy.listen(process.env.GRAPHQL_PORT, () => {
    logger.info(`${pjson.name} - ${pjson.version}`);
    logger.info('🚀 Server ready at');
    logger.info(`http://${process.env.HOSTNAME}:${process.env.GRAPHQL_PORT}/`);
  });
  return true;
};

const closeExpressServer = async () => {
  await disconnectDB();
};

module.exports = { expressServer, closeExpressServer, sartServer };
