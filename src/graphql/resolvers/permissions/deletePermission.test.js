/* eslint-disable no-underscore-dangle */
const { deletePermission } = require('./deletePermission');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const permissionsData = require('../../../../data/permissions.json');
const Permission = require('../../../models/permission');

describe('Delete permission unit test', () => {
  let idPermission = null;

  beforeAll(async () => {
    await connectDB({});
    let permissions = await Permission.find({});
    if (permissions.length === 0) {
      await Permission.insertMany(permissionsData);
      permissions = await Permission.find({});
    }
    idPermission = permissions[0].id;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('Should returns true if the permission was deleted', async () => {
    const response = await deletePermission(null, { id: idPermission });
    expect(response).toBe(true);
  });

  it("Should be return false if the permission doesn't exists", async () => {
    const response = await deletePermission(null, {
      id: '1166bc0aa1ca2e6dca0597cf',
    });
    expect(response).toBe(false);
  });
});
