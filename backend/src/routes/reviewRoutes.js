const express = require('express');
const router = express.Router();

const {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
} = require('../controllers/reviewController');

const userAuthMiddleware = require('../middleware/userAuth');
const authMiddleware = require('../middleware/auth'); // ادمین

// عمومی: فقط نظرات تایید‌شده
router.get('/approved', getApprovedReviews);

// کاربر لاگین‌شده: ثبت نظر
router.post('/', userAuthMiddleware, createReview);

// ادمین: همه نظرات
router.get('/', authMiddleware, getAllReviews);

// ادمین: تغییر وضعیت (تایید / رد)
router.patch('/:id/status', authMiddleware, updateReviewStatus);

// ادمین: حذف نظر
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;