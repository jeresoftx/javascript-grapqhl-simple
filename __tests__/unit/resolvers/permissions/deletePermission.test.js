/* eslint-disable no-underscore-dangle */
const {
  deletePermission,
} = require('../../../../src/graphql/resolvers/permissions/deletePermission');

describe('Delete permission unit test', () => {
  it('Should returns true if the permission was deleted', async () => {
    const response = await deletePermission(null, {
      id: '6466bc0aa1ca2e5dca5294cb',
    });
    expect(response).toBe(true);
  });

  it("Should be return false if the permission doesn't exists", async () => {
    const response = await deletePermission(null, {
      id: '1166bc0aa1ca2e6dca0597cf',
    });
    expect(response).toBe(false);
  });
});
