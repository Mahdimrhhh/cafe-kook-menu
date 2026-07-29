const express = require('express');
const router = express.Router();
const { getReviews, getKnowledge } = require('../controllers/otherController');

router.get('/reviews', getReviews);
router.get('/knowledge', getKnowledge);

module.exports = router;