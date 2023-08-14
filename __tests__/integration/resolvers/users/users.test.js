/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/expressServer');
const { queryUsers } = require('./features/query/query.users');

test('User list', async () => {
  const express = await expressServer({});
  const { app } = express;
  await User.insertMany(usersData);
  const response = await request(app)
    .post('/graphql')
    .set('content-type', 'application/json')
    .set('uer-agent', 'jest')
    .send({
      query: queryUsers,
      variables: { params: {} },
    });

  expect(response.errors).toBeUndefined();
  expect(response.body.data.users).toMatchObject([
    { fullName: 'Joel Alvarez Mexia' },
  ]);
  await closeExpressServer();
});
