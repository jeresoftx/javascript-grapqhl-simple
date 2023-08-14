const { roles } = require('../../../../src/graphql/resolvers/roles/roles');

describe('Roles unit test', () => {
  it('returns a roles list', async () => {
    const response = await roles(null, { params: {} });
    const expectData = '6466bc0aa1ca2e6dca1197bb';
    expect(response[0].id).toBe(expectData);
  });
});
