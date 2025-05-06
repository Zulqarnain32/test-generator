const Question = require('../models/Question');

const getQuestionsByChapter = async (req, res) => {
  try {
    const chapter = parseInt(req.params.chapter);
    const questions = await Question.find({ chapter });
    res.json(questions);
    console.log(questions)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getQuestionsByChapter };
