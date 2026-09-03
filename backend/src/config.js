require('dotenv').config();

const config = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'cafe_kook_secret_key_2026',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '123456'
};

if (!process.env.JWT_SECRET) {
    console.warn('[config] WARNING: JWT_SECRET not set in .env — using insecure default.');
}

module.exports = config;