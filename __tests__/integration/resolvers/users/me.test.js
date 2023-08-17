/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

const Token = require('../../../../src/models/token');
const User = require('../../../../src/models/user');
const tokensData = require('../../../data/tokens.json');
const usersData = require('../../../data/users.json');
const {
  expressServer,
  closeExpressServer,
} = require('../../../../src/server/server');
const { queryMe } = require('./features/query/query.me');

describe('Me unit test', () => {
  let app;

  beforeAll(async () => {
    app = await expressServer({});
  });

  it('Use me', async () => {
    await User.deleteMany({}).exec();
    await User.insertMany(usersData);
    await Token.deleteMany({}).exec();
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
        query: queryMe,
      });
    await expect(response.errors).toBeUndefined();
    await expect(response.body?.data?.me?.fullName).toBe('Joel Alvarez Mexia');
    await closeExpressServer();
  });
});
