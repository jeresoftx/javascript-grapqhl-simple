/* eslint-disable no-underscore-dangle */
const {
  updatePermission,
} = require('../../../../src/graphql/resolvers/permissions/updatePermission');

describe('Update a permission unit test', () => {
  it('returns a permission data if the permission was updated', async () => {
    const permission = {
      id: '6466bc0aa1ca2e6dca0597bb',
      name: 'permission update',
      decription: 'permission update',
    };
    const expectedData = 'permission update';
    const response = await updatePermission(null, permission);

    expect(response.name).toBe(expectedData);
  });

  it("Should be return false if the permission doesn't exists", async () => {
    const permission = {
      id: '1166bc0aa1ca2e6dca0597cf',
      name: 'permission update',
      decription: 'permission update',
    };
    const response = await updatePermission(null, permission);
    expect(response).toBeNull();
  });
});
