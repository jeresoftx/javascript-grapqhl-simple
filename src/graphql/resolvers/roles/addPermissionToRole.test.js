/* eslint-disable no-underscore-dangle */
const { addPermissionToRole } = require('./addPermissionToRole');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const rolesData = require('../../../../data/roles.json');
const permissionsData = require('../../../../data/permissions.json');
const Role = require('../../../models/role');
const Permission = require('../../../models/permission');

describe('Add a permission to a role unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    let roles = await Role.find({});
    if (roles.length === 0) {
      await Role.insertMany(rolesData);
      roles = await Role.find({});
    }
    let permissions = await Permission.find({});
    if (permissions.length === 0) {
      await Permission.insertMany(permissionsData);
      permissions = await Permission.find({});
    }
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('returns a role with new permission', async () => {
    const response = await addPermissionToRole(null, {
      idRole: '6466bc0aa1ca2e6dca1297cb',
      idPermission: '6466bc0aa1ca2e6dca1294cb',
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
