/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { config } = require('dotenv');

config();

let mongod = null;

const connectDB = async ({ url }) => {
  let dbUrl;
  if (!url) {
    mongod = await MongoMemoryServer.create();
    dbUrl = mongod.getUri();
  } else {
    dbUrl = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
  }
  const connection = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};

const disconnectDB = async () => {
  await mongoose.connection.close();

  if (mongod) {
    await mongod.stop();
    mongod = null;
  }
};

module.exports = { connectDB, disconnectDB };
