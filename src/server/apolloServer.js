/* eslint-disable import/no-extraneous-dependencies */
const { readFileSync } = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');
const { scalarTypeDefs } = require('graphql-scalars');

const resolvers = require('../graphql/resolvers/resolvers');

const apolloServer = async () => {
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
        userId: res.userId,
        token: res.token,
        isAuth: res.isAuth,
        operation,
      };
    },
  });
  return apollo;
};
module.exports = { apolloServer };
