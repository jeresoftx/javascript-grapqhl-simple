/* eslint-disable import/no-extraneous-dependencies */
const { readFileSync } = require('fs');
const { ApolloServer } = require('apollo-server-express');
const { scalarTypeDefs } = require('graphql-scalars');

const { connectDB } = require('../db/connectDB');
const resolvers = require('./resolvers/resolvers');

const getApolloServer = async (testing = true) => {
  await connectDB(testing);
  const myTypeDefs = readFileSync(
    __dirname.concat('/schema.graphql'),
  ).toString();

  const apollo = new ApolloServer({
    typeDefs: [scalarTypeDefs, myTypeDefs],
    resolvers,
    introspection: true,
  });
  return apollo;
};
module.exports = { getApolloServer };
