const mongoose = require("../config/db");

const usreSchma = mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = usreSchma;
