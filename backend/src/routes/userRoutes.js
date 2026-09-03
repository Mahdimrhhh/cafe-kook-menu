const express = require('express');
const router = express.Router();
const { registerOrLogin, getMe } = require('../controllers/userController');
const { requestOtp, verifyOtp } = require('../controllers/otpController');
const userAuthMiddleware = require('../middleware/userAuth');

// OTP
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

// سازگاری با نسخه قبلی
router.post('/login', registerOrLogin);

// اطلاعات کاربر فعلی (نیاز به لاگین)
router.get('/me', userAuthMiddleware, getMe);

module.exports = router;