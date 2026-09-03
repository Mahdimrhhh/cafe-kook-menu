const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function userAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'لطفاً وارد حساب کاربری خود شوید' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'توکن نامعتبر یا منقضی شده' });
  }
}

module.exports = userAuthMiddleware;