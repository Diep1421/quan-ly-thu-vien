const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;

/**
 * table ở trên sẽ viết được
 * auth: login, signin
 * users: getAllUsers, createUser, updateUser, deleteUser, getUserById
 */
