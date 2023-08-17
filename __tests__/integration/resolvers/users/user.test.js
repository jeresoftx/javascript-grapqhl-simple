/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryUser } = require('./features/query/query.user');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Read user integration test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Read a User', async () => {
    isAuthorized.mockReturnValue(true);
    await User.insertMany(usersData).exec();
    const response = await request(app)
      .post('/')
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
