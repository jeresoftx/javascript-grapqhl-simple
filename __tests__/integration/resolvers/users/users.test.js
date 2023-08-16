/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryUsers } = require('./features/query/query.users');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('User list integration test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('User list', async () => {
    isAuthorized.mockReturnValue(true);
    await User.insertMany(usersData);
    const response = await request(app)
      .post('/')
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
});
