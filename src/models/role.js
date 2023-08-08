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
    permissions: {
      type: [
        new Schema({
          pemrission: {
            type: String,
          },
        }),
      ],
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
  { collection: 'roles' },
);

module.exports = mongoose.model('Roles', schema);
