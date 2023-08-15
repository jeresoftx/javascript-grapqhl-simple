/* eslint-disable no-underscore-dangle */
const {
  removePermissionToRole,
} = require('../../../../src/graphql/resolvers/roles/removePermissionToRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Rmove a permission from a role unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a role with one less permission', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    expect(response.permissions).toHaveLength(5);
  });

  it('returns a role with one less permission', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bb',
    });
    expect(response.permissions).toHaveLength(4);
  });

  it("Should be return and error if the role doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
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
    isAuthorized.mockReturnValue(true);
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
