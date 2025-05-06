const Mcqs = require('../models/Mcqs');

const getMcqsByChapter = async (req, res) => {
  try {
    const chapter = parseInt(req.params.chapter);
    const mcqs = await Mcqs.find({ chapter });
    res.json(mcqs);
    // console.log(mcqs)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMcqsByChapter };
