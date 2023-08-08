const { permissions } = require('./permissions');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const permissionsData = require('../../../../data/permissions.json');
const Permission = require('../../../models/permission');

describe('Permissions unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    await Permission.insertMany(permissionsData);
  });

  afterAll(async () => {
    await disconnectDB({});
  });

  it('returns a permissions list', async () => {
    const response = await permissions(null, { params: {} });
    const expectData = '6466bc0aa1ca2e6dca0597bf';
    expect(response[0].id).toBe(expectData);
  });
});
