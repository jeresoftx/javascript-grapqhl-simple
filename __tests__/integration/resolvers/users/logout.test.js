/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const User = require('../../../../src/models/user');
const usersData = require('../../../data/users.json');
const Token = require('../../../../src/models/token');
const tokensData = require('../../../data/tokens.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { mutationLogout } = require('./features/mutation/mutation.logout');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Logout user unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('Can logout a user', async () => {
    isAuthorized.mockReturnValue(true);
    await User.deleteMany({});
    await User.insertMany(usersData);
    await Token.deleteMany({});
    await Token.insertMany(tokensData);
    const response = await request(app)
      .post('/')
      .set('content-type', 'application/json')
      .set('user-agent', 'jest')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2YmMwYWExY2EyZTZkY2EwNTk3Y2IiLCJ1c2VybmFtZSI6ImplcmVzb2Z0IiwiaWF0IjoxNjkxNzI0NzA0LCJleHAiOjE2OTQzMTY3MDR9.ThnuPMCitWz0eUhowl4VinQrI8p4dmXfxCpSz77Cvok',
      )
      .send({
        query: mutationLogout,
      });
    await expect(response.errors).toBeUndefined();
    await expect(response.body.data.logout).toBe(true);
    await closeExpressServer();
  });
});
