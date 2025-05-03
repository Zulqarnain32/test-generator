// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  chapter: Number,
  chapterName: String,
  question: String,
});

module.exports = mongoose.model("Question", questionSchema);
