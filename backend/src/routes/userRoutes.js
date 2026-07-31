const express = require('express');
const router = express.Router();
const { registerOrLogin, getMe } = require('../controllers/userController');
const userAuthMiddleware = require('../middleware/userAuth');

// ثبت‌نام / ورود
router.post('/login', registerOrLogin);

// اطلاعات کاربر فعلی (نیاز به لاگین)
router.get('/me', userAuthMiddleware, getMe);

module.exports = router;