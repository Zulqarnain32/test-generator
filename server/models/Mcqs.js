// models/Mcqs.js
const mongoose = require("mongoose");

const mcqsSchema = new mongoose.Schema({
  chapter: Number,
  chapterName: String,
  question: String,
  options: Array
});

module.exports = mongoose.model("Mcqs", mcqsSchema);
