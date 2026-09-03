const { db, uuidv4 } = require('../database/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const OTP_TTL_MS = 60 * 1000;

function makeOtp() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

async function requestOtp(req, res) {
    try {
        const { phone } = req.body;
        if (!phone || !/^09\d{9}$/.test(phone)) {
            return res.status(400).json({ message: 'شماره موبایل معتبر نیست' });
        }

        const code = makeOtp();
        const record = {
            id: uuidv4(),
            phone,
            code,
            createdAt: Date.now(),
            expiresAt: Date.now() + OTP_TTL_MS,
            used: false
        };

        await db.read();
        db.data.otpCodes = db.data.otpCodes || [];
        db.data.otpCodes.push(record);
        await db.write();

        console.log(`[OTP] ${phone} → ${code}`);
        res.json({ message: 'کد تایید ارسال شد', devCode: code });
    } catch (err) {
        console.error('requestOtp error:', err);
        res.status(500).json({ message: 'خطا در ارسال کد' });
    }
}

async function verifyOtp(req, res) {
    try {
        const { phone, code } = req.body;
        if (!phone || !code) {
            return res.status(400).json({ message: 'شماره و کد الزامی است' });
        }

        await db.read();
        const otps = db.data.otpCodes || [];
        const idx = otps.findIndex(o =>
            o.phone === phone && o.code === code && !o.used
        );

        if (idx === -1) {
            return res.status(401).json({ message: 'کد وارد شده اشتباه است' });
        }

        const record = otps[idx];
        if (Date.now() > record.expiresAt) {
            return res.status(401).json({ message: 'کد منقضی شده است' });
        }

        otps[idx].used = true;
        await db.write();

        let user = (db.data.users || []).find(u => u.phone === phone);
        const isNewUser = !user;

        if (!user) {
            user = {
                id: uuidv4(),
                phone,
                birthDate: 'نامشخص',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            db.data.users = db.data.users || [];
            db.data.users.push(user);
        } else {
            user.lastLogin = new Date().toISOString();
        }
        await db.write();

        const token = jwt.sign(
            { id: user.id, phone: user.phone, role: 'user' },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            token,
            isNewUser,
            user: { id: user.id, phone: user.phone, birthDate: user.birthDate }
        });
    } catch (err) {
        console.error('verifyOtp error:', err);
        res.status(500).json({ message: 'خطا در تایید کد' });
    }
}

module.exports = { requestOtp, verifyOtp };