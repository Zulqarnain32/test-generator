const express = require('express');
const { getQuestionsByChapter } = require('../controllers/questionController');

const router = express.Router();
router.get('/chapter/:chapter', getQuestionsByChapter);

module.exports = router;
