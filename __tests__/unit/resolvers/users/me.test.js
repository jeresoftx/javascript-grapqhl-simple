const { me } = require('../../../../src/graphql/resolvers/users/me');

describe('Me unit test', () => {
  it("return a erro because the user isn't authorized", async () => {
    const context = { isAuth: false };
    const response = me(null, {}, context);

    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('No Authorize!');
  });

  it('return a user', async () => {
    const context = { isAuth: true, userId: '6466bc0aa1ca2e6dca0597cb' };
    const response = await me(null, {}, context);
    const expected = {
      name: 'Joel',
      lastName: 'Alvarez Mexia',
      fullName: 'Joel Alvarez Mexia',
    };
    expect(JSON.parse(JSON.stringify(response))).toMatchObject(expected);
  });

  it('return an error because the user id i wrong', async () => {
    const context = { isAuth: true, userId: '6466bc0aa1ca2e6dca0597cf' };
    const response = me(null, {}, context);
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('No Authorize!');
  });
});
