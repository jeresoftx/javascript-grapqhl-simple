const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
  { collection: 'permissions' },
);

module.exports = mongoose.model('Permission', schema);
