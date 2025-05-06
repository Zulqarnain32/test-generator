const express = require('express');
const { getMcqsByChapter } = require('../controllers/mcqsControllers');

const router = express.Router();
router.get('/chapter/:chapter', getMcqsByChapter);

module.exports = router;
