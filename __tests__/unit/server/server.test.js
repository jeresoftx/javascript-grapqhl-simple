const { config } = require('dotenv');
const { sartServer, stopServer } = require('../../../src/server/server');
const { disconnectDB } = require('../../../src/db/connectDB');

config();

describe('DB connection test', () => {
  it('Should server run', async () => {
    await disconnectDB();
    const server = await sartServer({ url: null });
    await expect(server).toBeDefined();
    await stopServer(server);
  });
});
