const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// آپلود یک عکس
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'هیچ فایلی ارسال نشده' });
    }

    // آدرس عکس برای استفاده در فرانت
    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      message: 'عکس با موفقیت آپلود شد',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: 'خطا در آپلود عکس' });
  }
});

module.exports = router;