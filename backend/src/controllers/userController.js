const jwt = require('jsonwebtoken');
const { db, uuidv4 } = require('../database/db');
const { JWT_SECRET } = require('../config');

// ثبت‌نام / ورود کاربر (با شماره موبایل + تاریخ تولد)
async function registerOrLogin(req, res) {
  try {
    const { phone, birthDate } = req.body;

    if (!phone || !birthDate) {
      return res.status(400).json({ message: 'شماره موبایل و تاریخ تولد الزامی است' });
    }

    // اعتبارسنجی ساده شماره
    if (!/^09\d{9}$/.test(phone)) {
      return res.status(400).json({ message: 'شماره موبایل معتبر نیست' });
    }

    await db.read();

    let user = db.data.users.find(u => u.phone === phone);

    if (user) {
      // کاربر از قبل وجود داره → ورود
      // تاریخ تولد رو آپدیت می‌کنیم (اختیاری)
      user.birthDate = birthDate;
      user.lastLogin = new Date().toISOString();
    } else {
      // کاربر جدید → ثبت‌نام
      user = {
        id: uuidv4(),
        phone,
        birthDate,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      db.data.users.push(user);
    }

    await db.write();

    // ساخت توکن
    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: 'user' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'ورود موفقیت‌آمیز بود',
      token,
      user: {
        id: user.id,
        phone: user.phone,
        birthDate: user.birthDate
      }
    });

  } catch (error) {
    console.error('User auth error:', error);
    res.status(500).json({ message: 'خطا در ورود/ثبت‌نام' });
  }
}

// گرفتن اطلاعات کاربر فعلی
async function getMe(req, res) {
  try {
    await db.read();
    const user = db.data.users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'کاربر پیدا نشد' });
    }

    res.json({
      id: user.id,
      phone: user.phone,
      birthDate: user.birthDate
    });
  } catch (error) {
    res.status(500).json({ message: 'خطا' });
  }
}

module.exports = {
  registerOrLogin,
  getMe
};