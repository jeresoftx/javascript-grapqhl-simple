const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    expiresIn: {
      type: Schema.Types.String,
      required: true,
    },
    userAgent: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: [
        'REGISTER',
        'LOGIN',
        'CHANGE',
        'RESET',
        'REFRESH',
        'APP',
        'VERIFY_EMAIL',
      ],
      required: true,
    },
    token: {
      type: Schema.Types.String,
      required: true,
      index: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
  { collection: 'tokens' },
);

module.exports = mongoose.model('Token', schema);
