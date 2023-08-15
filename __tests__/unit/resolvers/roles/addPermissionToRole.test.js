/* eslint-disable no-underscore-dangle */
const {
  addPermissionToRole,
} = require('../../../../src/graphql/resolvers/roles/addPermissionToRole');
const { isAuthorized } = require('../../../../src/middleware/isAuthorized');

jest.mock('../../../../src/middleware/isAuthorized');

describe('Add a permission to a role unit test', () => {
  beforeEach(() => {
    isAuthorized.mockClear();
  });

  it('return an Error', async () => {
    isAuthorized.mockImplementation(() => {
      throw new Error('Unauthorized!');
    });
    const response = addPermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca1594cb',
    });
    await expect(response).rejects.toThrow(Error);
    await expect(response).rejects.toThrow('Unauthorized!');
  });

  it('returns a role with new permission', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca1594cb',
    });
    expect(response.permissions).toHaveLength(5);
  });

  it('returns a role with new permission', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    expect(response.permissions).toHaveLength(6);
  });

  it('returns a role with new permission', async () => {
    isAuthorized.mockReturnValue(true);
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0ba1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    expect(response.permissions).toHaveLength(1);
  });

  it("Should be return and error if the role doesn't exists", async () => {
    isAuthorized.mockReturnValue(true);
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
    isAuthorized.mockReturnValue(true);
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
