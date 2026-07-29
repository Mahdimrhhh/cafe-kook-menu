const jwt = require('jsonwebtoken');

const JWT_SECRET = 'cafe_kook_secret_key_2026'; // همان کلید

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'دسترسی غیرمجاز - توکن وجود ندارد' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده' });
  }
}

module.exports = authMiddleware;