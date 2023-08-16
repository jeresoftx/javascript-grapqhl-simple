/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { mutationEditUser } = require('./features/mutation/mutation.editUser');
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
        query: mutationEditUser,
        variables: {
          id: '6466bc0aa1ca2e6dca0597cb',
          name: 'Benjamin',
          lastName: 'Alvarez',
        },
      });
    const expectData = {
      id: '6466bc0aa1ca2e6dca0597cb',
      name: 'Benjamin',
      lastName: 'Alvarez',
      fullName: 'Benjamin Alvarez',
    };
    await expect(response.errors).toBeUndefined();
    await expect(response.body?.data?.editUser).toMatchObject(expectData);
    await closeExpressServer();
  });
});
