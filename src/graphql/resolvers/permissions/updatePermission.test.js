/* eslint-disable no-underscore-dangle */
const { updatePermission } = require('./updatePermission');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const permissionsData = require('../../../../data/permissions.json');
const Permission = require('../../../models/permission');

describe('Update a permission unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    let permissions = await Permission.find({});
    if (permissions.length === 0) {
      await Permission.insertMany(permissionsData);
      permissions = await Permission.find({});
    }
  });

  afterAll(async () => {
    await disconnectDB();
  });

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
});
