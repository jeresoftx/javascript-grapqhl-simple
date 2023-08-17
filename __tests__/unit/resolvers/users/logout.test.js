/* eslint-disable no-underscore-dangle */

const Token = require('../../../../src/models/token');
const tokensData = require('../../../data/tokens.json');
const { logout } = require('../../../../src/graphql/resolvers/users/logout');

describe('Logout user unit test', () => {
  it('Should returns true because the user is already out', async () => {
    const context = {
      isAuth: false,
    };
    const response = await logout(null, {}, context);
    expect(response).toBe(true);
  });

  it("Should returns true because the token doe'nt exists", async () => {
    const context = {
      isAuth: true,
      token: 'tokenfail',
    };
    const response = await logout(null, {}, context);
    expect(response).toBe(true);
  });

  it('Should returns true', async () => {
    await Token.deleteMany({});
    await Token.insertMany(tokensData);
    const context = {
      isAuth: true,
      token: tokensData[0].token,
    };
    const response = await logout(null, {}, context);
    expect(response).toBe(true);
  });
});
