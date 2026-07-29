const jwt = require('jsonwebtoken');
const { db } = require('../database/db');

const JWT_SECRET = 'cafe_kook_secret_key_2026'; // کلید ثابت

async function login(req, res) {
  try {
    const { username, password } = req.body;

    await db.read();

    if (!db.data.admin) {
      return res.status(500).json({ message: 'اطلاعات ادمین در دیتابیس وجود ندارد' });
    }

    const admin = db.data.admin;

    if (username !== admin.username || password !== admin.password) {
      return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' });
    }

    const token = jwt.sign(
      { username: admin.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'ورود موفقیت‌آمیز بود',
      token: token,
      username: admin.username
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'خطا در ورود', error: error.message });
  }
}

module.exports = { login };