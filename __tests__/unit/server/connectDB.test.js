const { config } = require('dotenv');
const { sartServer } = require('../../../src/server/server');
const { disconnectDB } = require('../../../src/db/connectDB');

config();

describe('DB connection test', () => {
  it('Should server run', async () => {
    await disconnectDB();
    await expect(sartServer({ url: null })).resolves.toBe(true);
  });
});
