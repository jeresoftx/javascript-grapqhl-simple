/* eslint-disable no-underscore-dangle */
const { login } = require('../../../../src/graphql/resolvers/users/login');

describe('Login user unit test', () => {
  it("Should returns error if the user doesn't exists", async () => {
    await expect(
      login(null, {
        username: 'fail',
        password: 'fail',
      }),
    ).rejects.toThrowError('INFO | Login error!');
  });

  it('Should returns error if the password is inccorect', async () => {
    await expect(
      login(null, {
        username: 'jeresoft',
        password: 'cochiverde$1',
      }),
    ).rejects.toThrowError('INFO | Login error!');
  });

  it('Should returns a token with 30d duration string if everything is correct', async () => {
    const response = await login(
      null,
      {
        username: 'jeresoft',
        password: 'Cochiverde$1',
        remember: true,
      },
      { userAgent: 'jest' },
    );
    expect(response).not.toBeUndefined();
  });

  it('Should returns a token with 24h duration string if everything is correct', async () => {
    const response = await login(
      null,
      {
        username: 'jeresoft',
        password: 'Cochiverde$1',
      },
      { userAgent: 'jest' },
    );
    expect(response).toEqual(expect.any(String));
  });
});
