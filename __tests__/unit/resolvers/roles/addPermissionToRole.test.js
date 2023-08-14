/* eslint-disable no-underscore-dangle */
const {
  addPermissionToRole,
} = require('../../../../src/graphql/resolvers/roles/addPermissionToRole');

describe('Add a permission to a role unit test', () => {
  it('returns a role with new permission', async () => {
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca1594cb',
    });
    expect(response.permissions).toHaveLength(5);
  });

  it('returns a role with new permission', async () => {
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    expect(response.permissions).toHaveLength(6);
  });

  it('returns a role with new permission', async () => {
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0ba1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    expect(response.permissions).toHaveLength(1);
  });

  it("Should be return and error if the role doesn't exists", async () => {
    await expect(
      addPermissionToRole(null, {
        idRole: '6466bc0ff1ca2e6dca1297cb',
        idPermission: '6466bc0aa1ca2e6dca0597bf',
      }),
    ).rejects.toThrowError(
      "INFO | The role with 6466bc0ff1ca2e6dca1297cb doesn't exists!",
    );
  });

  it("Should be return and error if the role doesn't exists", async () => {
    await expect(
      addPermissionToRole(null, {
        idRole: '6466bc0aa1ca2e6dca1297cb',
        idPermission: '6466bc0aa1112e6dca0597bf',
      }),
    ).rejects.toThrowError(
      "INFO | The permission with 6466bc0aa1112e6dca0597bf doesn't exists!",
    );
  });
});
