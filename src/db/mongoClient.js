/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(
  `${process.env.DB_HOST}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

module.exports = { db };
