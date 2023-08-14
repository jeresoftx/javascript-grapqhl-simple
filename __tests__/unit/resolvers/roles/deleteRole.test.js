/* eslint-disable no-underscore-dangle */
const {
  deleteRole,
} = require('../../../../src/graphql/resolvers/roles/deleteRole');

describe('Delete role unit test', () => {
  it('Should returns true if the role was deleted', async () => {
    const response = await deleteRole(null, { id: '6466bc0ba1ca2e6dca1297cb' });
    expect(response).toBe(true);
  });

  it("Should be return false if the role doesn't exists", async () => {
    const response = await deleteRole(null, {
      id: '1166bc0aa1ca2e6dca0597cf',
    });
    expect(response).toBe(false);
  });
});
