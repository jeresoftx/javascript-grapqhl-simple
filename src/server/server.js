/* eslint-disable import/no-extraneous-dependencies */
const { readFileSync } = require('fs');
const http = require('http');
const helmet = require('helmet');
const { config } = require('dotenv');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { scalarTypeDefs } = require('graphql-scalars');
const depthLimit = require('graphql-depth-limit');
const Sentry = require('@sentry/node');

const resolvers = require('../graphql/resolvers/resolvers');
const { authorization } = require('../middleware/auth');
const { connectDB, disconnectDB } = require('../db/connectDB');
const { logger } = require('../utils/logger');
const pjson = require('../../package.json');
const { sentryStart } = require('./sentry');

config();
const release = `${pjson.name} - ${pjson.version}`;

const expressServer = async ({ url }) => {
  await connectDB({ url });
  const app = express();
  app.use(helmet());
  app.use(authorization);
  const myTypeDefs = readFileSync(
    __dirname.concat('/../graphql/schema.graphql'),
  ).toString();

  const apolloServerSentryPlugin = sentryStart({
    release,
    dsn: process.env.SENTRY_DSN,
    env: process.env.APP_ENV,
  });
  const plugins = [apolloServerSentryPlugin];

  const apollo = new ApolloServer({
    typeDefs: [scalarTypeDefs, myTypeDefs],
    resolvers,
    validationRules: [depthLimit(7)],
    introspection: false,
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
        transaction: Sentry.startTransaction({
          op: 'gql',
          name: 'GraphQLTransaction', // this will be the default name, unless the gql query has a name
        }),
      };
    },
    plugins,
  });
  await apollo.start();
  apollo.applyMiddleware({ app, path: '/' });
  return app;
};

const sartServer = async ({ url }) => {
  const app = await expressServer({ url });
  const proxy = http.createServer(app);
  let port = process.env.GRAPHQL_PORT;
  if (process.env.NODE_ENV === 'test') {
    port = process.env.GRAPHQL_PORT_DEV;
  }
  proxy.listen(port, () => {
    logger.info(release);
    logger.info('🚀 Server ready at');
    logger.info(`http://${process.env.HOSTNAME}:${port}/`);
    if (process.env.NODE_ENV === 'test') {
      proxy.close();
    }
  });
  return proxy;
};

const closeExpressServer = async () => {
  await disconnectDB();
};

const stopServer = async () => {
  await disconnectDB();
};

module.exports = {
  expressServer,
  closeExpressServer,
  sartServer,
  stopServer,
};
