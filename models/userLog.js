const mongoose = require("mongoose");

const UserLogSchema = new mongoose.Schema({
  ip: String,
  os: String,
  browser: String,
  date: Date
});

const User = mongoose.model("UserLog", UserLogSchema);

module.exports = User;
