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
      .set('Content-Type', 'application/json')
      .set('user-agent', 'jest')
      .set('Authorization', `Bearer ${process.env.TOKEN_JWT}`)
      .send({
        query: queryMe,
      });
    await expect(response.errors).toBeUndefined();
    await expect(response.body?.data?.me?.fullName).toBe('Joel Alvarez Mexia');
    await closeExpressServer();
  });
});
