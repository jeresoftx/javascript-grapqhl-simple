/* eslint-disable import/no-extraneous-dependencies */
const { Schema } = require('mongoose');

const { db } = require('../db/mongoClient');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    emails: [
      new Schema({
        _id: false,
        email: {
          type: String,
          trim: true,
        },
        main: {
          type: Boolean,
          default: false,
        },
      }),
    ],
    phones: [
      new Schema({
        _id: false,
        phone: {
          type: String,
          trim: true,
        },
        main: {
          type: Boolean,
          default: false,
        },
      }),
    ],
    roles: {
      type: [String],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastconnected: {
      type: Schema.Types.Date,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
  { collection: 'users' },
);

module.exports = db.model('User', schema);
