const {
  permissions,
} = require('../../../../src/graphql/resolvers/permissions/permissions');

describe('Permissions unit test', () => {
  it('returns a permissions list', async () => {
    const response = await permissions(null, { params: {} });
    const expectData = '6466bc0aa1ca2e6dca0597bf';
    expect(response[0].id).toBe(expectData);
  });
});
