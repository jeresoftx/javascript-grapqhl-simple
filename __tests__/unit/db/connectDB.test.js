const { config } = require('dotenv');

const { connectDB, disconnectDB } = require('../../../src/db/connectDB');

config();

describe('DB connection test', () => {
  it('Should return an error because you try to connect double time', async () => {
    await expect(connectDB({})).rejects.toThrowError(
      "Can't call `openUri()` on an active connection with different connection strings. Make sure you aren't calling `mongoose.connect()` multiple times. See: https://mongoosejs.com/docs/connections.html#multiple_connections",
    );
  });

  it('Should connect to db', async () => {
    await disconnectDB();
    console.log({
      url: `${process.env.DB_HOST}/${process.env.DB_NAME}`,
    });
    const connection = await connectDB({
      url: `${process.env.DB_HOST}/${process.env.DB_NAME}`,
    });
    await expect(connection).not.toBeNull();
    await expect(disconnectDB()).not.toBeNull();
  });

  it('Should connect to db', async () => {
    await disconnectDB();
    const connection = await connectDB({ url: null });
    expect(connection).not.toBeNull();
    await expect(disconnectDB()).not.toBeNull();
  });

  it('Should not disconnect twice', async () => {
    await disconnectDB();
    await connectDB({
      url: null,
    });
    await expect(disconnectDB()).not.toBeNull();
  });
});
