/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
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

// eslint-disable-next-line func-names
schema.pre('save', async function (next) {
  if (this.name) {
    this.fullName = `${this.name} ${this.lastName}`;
  }
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

schema.post('save', (error, doc, next) => {
  if (error.code === 11000) {
    next(new Error('The username already exists!, try with another one'));
  } else {
    next();
  }
});

module.exports = mongoose.model('User', schema);
