/* eslint-disable no-underscore-dangle */
const { removePermissionToRole } = require('./removePermissionToRole');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const rolesData = require('../../../../data/roles.json');
const permissionsData = require('../../../../data/permissions.json');
const Role = require('../../../models/role');
const Permission = require('../../../models/permission');

describe('Rmove a permission from a role unit test', () => {
  let permissions;
  let roles;

  beforeAll(async () => {
    await connectDB({});
    roles = await Role.find({});
    if (roles.length === 0) {
      await Role.insertMany(rolesData);
      roles = await Role.find({});
    }
    permissions = await Permission.find({});
    if (permissions.length === 0) {
      await Permission.insertMany(permissionsData);
      permissions = await Permission.find({});
    }
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a role with one less permission', async () => {
    const response = await removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bf',
    });
    console.log(response);
    expect(response.permissions).toHaveLength(5);
  });

  it('returns a role with one less permission', async () => {
    const response = await removePermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca0597bb',
    });
    console.log(response);
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
