const { model, Schema } = require("mongoose");

const users = model(
  "users", // document name
  new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  })
);

module.exports = users;
