/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/expressServer');
const { queryUser } = require('./features/query/query.user');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Read user integration test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Read a User', async () => {
    isAuthorized.mockReturnValue(true);
    const express = await expressServer({});
    const { app } = express;
    await User.insertMany(usersData);
    const response = await request(app)
      .post('/graphql')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: queryUser,
        variables: { id: '6466bc0aa1ca2e6dca0597cb' },
      });

    expect(response.errors).toBeUndefined();
    expect(response.body?.data?.user?.fullName).toBe('Joel Alvarez Mexia');
    await closeExpressServer();
  });
});
