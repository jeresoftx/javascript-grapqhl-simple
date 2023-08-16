/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { mutationLogin } = require('./features/mutation/mutation.login');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Login user unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can login a new user', async () => {
    isAuthorized.mockReturnValue(true);
    await User.deleteMany({});
    await User.insertMany(usersData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('user-agent', 'jest')
      .send({
        query: mutationLogin,
        variables: {
          username: 'jeresoft',
          password: 'Cochiverde$1',
        },
      });
    const expectData = {
      data: { login: expect.any(String) },
    };
    await expect(response.errors).toBeUndefined();
    await expect(response.body).toMatchObject(expectData);
    await closeExpressServer();
  });
});
