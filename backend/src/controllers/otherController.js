const { db } = require('../database/db');

async function getReviews(req, res) {
  try {
    await db.read();
    res.json(db.data.reviews || []);
  } catch (error) {
    res.status(500).json({ message: 'خطا' });
  }
}

async function getKnowledge(req, res) {
  try {
    await db.read();
    res.json(db.data.knowledge || []);
  } catch (error) {
    res.status(500).json({ message: 'خطا' });
  }
}

module.exports = { getReviews, getKnowledge };