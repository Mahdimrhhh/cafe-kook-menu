const { db, uuidv4 } = require('../database/db');

// ثبت نظر جدید (فقط کاربر لاگین‌شده)
async function createReview(req, res) {
  try {
    const { name, text, rating } = req.body;

    if (!name || !text) {
      return res.status(400).json({ message: 'نام و متن نظر الزامی است' });
    }

    const numericRating = Number(rating);
    if (rating !== undefined && rating !== null && rating !== '' && (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5)) {
      return res.status(400).json({ message: 'امتیاز باید بین ۱ تا ۵ باشد' });
    }

    await db.read();

    const newReview = {
      id: uuidv4(),
      userId: req.user.id,
      phone: req.user.phone,
      name: name.trim(),
      text: text.trim(),
      rating: numericRating || null,
      status: 'pending', // در انتظار تایید
      createdAt: new Date().toISOString()
    };

    db.data.reviews.push(newReview);
    await db.write();

    res.status(201).json({
      message: 'نظر شما ثبت شد و پس از تایید نمایش داده می‌شود',
      review: newReview
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطا در ثبت نظر' });
  }
}

// گرفتن نظرات تایید‌شده (برای سایت اصلی)
async function getApprovedReviews(req, res) {
  try {
    await db.read();
    const approved = db.data.reviews.filter(r => r.status === 'approved');
    res.json(approved);
  } catch (error) {
    res.status(500).json({ message: 'خطا' });
  }
}

// گرفتن همه نظرات (فقط ادمین)
async function getAllReviews(req, res) {
  try {
    await db.read();
    res.json(db.data.reviews || []);
  } catch (error) {
    res.status(500).json({ message: 'خطا' });
  }
}

// تایید یا رد نظر (فقط ادمین)
async function updateReviewStatus(req, res) {
  try {
    const { status } = req.body; // 'approved' یا 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'وضعیت نامعتبر است' });
    }

    await db.read();
    const index = db.data.reviews.findIndex(r => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'نظر پیدا نشد' });
    }

    db.data.reviews[index].status = status;
    await db.write();

    res.json(db.data.reviews[index]);
  } catch (error) {
    res.status(500).json({ message: 'خطا در تغییر وضعیت' });
  }
}

// حذف نظر (فقط ادمین)
async function deleteReview(req, res) {
  try {
    await db.read();
    const index = db.data.reviews.findIndex(r => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'نظر پیدا نشد' });
    }

    db.data.reviews.splice(index, 1);
    await db.write();

    res.json({ message: 'نظر حذف شد' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف' });
  }
}

module.exports = {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
};