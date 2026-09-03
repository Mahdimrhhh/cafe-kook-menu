const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getKnowledge,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge
} = require('../controllers/otherController');

router.get('/knowledge', getKnowledge);
router.post('/knowledge', authMiddleware, createKnowledge);
router.put('/knowledge/:id', authMiddleware, updateKnowledge);
router.delete('/knowledge/:id', authMiddleware, deleteKnowledge);

module.exports = router;