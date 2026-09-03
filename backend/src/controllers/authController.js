const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../database/db');
const { JWT_SECRET } = require('../config');

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'نام کاربری و رمز عبور الزامی است' });
    }

    await db.read();

    if (!db.data.admin) {
      return res.status(500).json({ message: 'اطلاعات ادمین در دیتابیس وجود ندارد' });
    }

    const admin = db.data.admin;

    let passwordOk = false;
    if (admin.passwordHash) {
      passwordOk = await bcrypt.compare(password, admin.passwordHash);
    } else {
      passwordOk = (password === admin.password);
    }

    if (username !== admin.username || !passwordOk) {
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