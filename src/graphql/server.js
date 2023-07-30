/* eslint-disable import/no-extraneous-dependencies */
const { readFileSync } = require('fs');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers/resolvers');

const getApolloServer = () => {
  const typeDefs = readFileSync(__dirname.concat('/schema.graphql')).toString();

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
  return apollo;
};
module.exports = { getApolloServer };
