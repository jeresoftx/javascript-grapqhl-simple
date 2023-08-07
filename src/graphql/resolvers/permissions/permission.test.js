const { permission } = require('./permission');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const permissionsData = require('../../../../data/permissions.json');
const Permission = require('../../../models/permission');

describe('Permission unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    await Permission.insertMany(permissionsData);
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('return a permission', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await permission(null, { id: permissionsData[0]._id });
    const expectData = {
      name: permissionsData[0].name,
    };

    expect(response).toMatchObject(expectData);
  });
});
