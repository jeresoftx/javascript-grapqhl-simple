const { config } = require('dotenv');

const { connectDB, disconnectDB } = require('../../../src/db/connectDB');

config();

describe('DB connection test', () => {
  it('Should connect to db', async () => {
    await disconnectDB();
    const connection = await connectDB({
      url: `${process.env.DB_HOST}/${process.env.DB_NAME}`,
    });
    await expect(connection).not.toBeNull();
    await expect(disconnectDB()).resolves.not.toBeNull();
  });

  it('Should connect to db', async () => {
    await disconnectDB();
    const connection = await connectDB({ url: null });
    expect(connection).not.toBeNull();
    await expect(disconnectDB()).resolves.not.toBeNull();
  });

  it('Should not disconnect twice', async () => {
    await disconnectDB();
    await connectDB({
      url: null,
    });
    await expect(disconnectDB()).resolves.not.toBeNull();
  });
});
