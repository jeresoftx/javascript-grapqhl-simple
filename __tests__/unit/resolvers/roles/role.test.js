const { role } = require('../../../../src/graphql/resolvers/roles/role');

describe('Role unit test', () => {
  it('return a role', async () => {
    const response = await role(null, { id: '6466bc0aa1ca2e6dca1197bb' });
    const expectData = {
      name: 'SUPER ADMIN',
    };

    expect(response).toMatchObject(expectData);
  });
});
