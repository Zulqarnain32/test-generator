// models/Meta.js
const mongoose = require("mongoose");

const metaSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
});

module.exports = mongoose.model("Meta", metaSchema);
