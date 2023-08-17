const { config } = require('dotenv');

const { connectDB, disconnectDB } = require('../../src/db/connectDB');
const User = require('../../src/models/user');
const usersData = require('../data/users.json');
const Permission = require('../../src/models/permission');
const permissionsData = require('../data/permissions.json');
const Role = require('../../src/models/role');
const rolesData = require('../data/roles.json');

config();

beforeAll(async () => {
  await connectDB({});
  await User.deleteMany({});
  await Permission.deleteMany({});
  await Role.deleteMany({});
  await User.insertMany(usersData);
  await Permission.insertMany(permissionsData);
  await Role.insertMany(rolesData);
});

afterAll(async () => {
  await disconnectDB();
});
