/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const Dayjs = require('dayjs');

const User = require('../../../../src/models/user');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { mutationAddUser } = require('./features/mutation/mutation.addUser');
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
    const timestamp = Dayjs().toDate().getTime();
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('uer-agent', 'jest')
      .send({
        query: mutationAddUser,
        variables: {
          name: 'Benjamin',
          lastName: 'Alvarez',
          username: `benAlvarez-${timestamp}`,
          email: 'jeresoft+2@gmail.com',
          phone: '6691210703',
          password: process.env.USER_PASSWORD_TEST,
        },
      });
    const expectData = {
      addUser: {
        fullName: 'Benjamin Alvarez',
      },
    };
    await expect(response.errors).toBeUndefined();
    await expect(response.body?.data).toMatchObject(expectData);
    await closeExpressServer();
  });
});
