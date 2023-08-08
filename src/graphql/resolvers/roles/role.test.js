const { role } = require('./role');
const { connectDB, disconnectDB } = require('../../../db/connectDB');
const rolesData = require('../../../../data/roles.json');
const Role = require('../../../models/role');

describe('Role unit test', () => {
  beforeAll(async () => {
    await connectDB({});
    await Role.insertMany(rolesData);
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('return a role', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await role(null, { id: rolesData[0]._id });
    const expectData = {
      name: rolesData[0].name,
    };

    expect(response).toMatchObject(expectData);
  });
});
