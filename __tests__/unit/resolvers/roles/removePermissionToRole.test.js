/* eslint-disable no-underscore-dangle */
const {
  removePermissionToRole,
} = require('../../../../src/graphql/resolvers/roles/removePermissionToRole');

describe('Rmove a permission from a role unit test', () => {
  it('returns a role with one less permission', async () => {
    const response = await removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    expect(response.permissions).toHaveLength(5);
  });

  it('returns a role with one less permission', async () => {
    const response = await removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bb',
    });
    expect(response.permissions).toHaveLength(4);
  });

  it("Should be return and error if the role doesn't exists", async () => {
    await expect(
      removePermissionToRole(null, {
        idRole: '6466bc0ff1ca2e6dca1297cb',
        idPermission: '6466bc0aa1ca2e6dca0597bf',
      }),
    ).rejects.toThrowError(
      "INFO | The role with 6466bc0ff1ca2e6dca1297cb doesn't exists!",
    );
  });

  it("Should be return and error if the role doesn't exists", async () => {
    await expect(
      removePermissionToRole(null, {
        idRole: '6466bc0aa1ca2e6dca1297cb',
        idPermission: '6466bc0aa1112e6dca0597bf',
      }),
    ).rejects.toThrowError(
      "INFO | The permission with 6466bc0aa1112e6dca0597bf doesn't exists!",
    );
  });
});
