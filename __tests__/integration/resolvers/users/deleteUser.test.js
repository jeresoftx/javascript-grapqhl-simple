const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const {
  mutationDeleteUser,
} = require('./features/mutation/mutation.deleteUser');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Add user unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can Add a new user', async () => {
    isAuthorized.mockReturnValue(true);
    await User.deleteMany({});
    await User.insertMany(usersData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationDeleteUser,
        variables: {
          id: '6466bc0aa1ca2e6dca0597cb',
        },
      });
    await expect(response.errors).toBeUndefined();
    await expect(response.body?.data?.deleteUser).toEqual(true);
    await closeExpressServer();
  });
});
