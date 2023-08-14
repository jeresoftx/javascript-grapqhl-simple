const {
  permission,
} = require('../../../../src/graphql/resolvers/permissions/permission');

describe('Permission unit test', () => {
  it('return a permission', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await permission(null, { id: '6466bc0aa1ca2e6dca0597bf' });
    const expectData = {
      name: '*',
    };

    expect(response).toMatchObject(expectData);
  });
});
