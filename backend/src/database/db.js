const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// مسیر فایل دیتابیس
const file = path.join(__dirname, '../../data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {
  products: [],
  categories: [],
  knowledge: [],
  reviews: [],
  settings: {
    featuredProductId: null
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || '123456'
  }
});

// مقداردهی اولیه دیتابیس
async function initDB() {
  await db.read();

  // اگر دیتابیس خالی بود، داده‌های اولیه رو بریز
  if (!db.data) {
    db.data = {
      products: [],
      categories: [],
      knowledge: [],
      reviews: [],
      settings: {
        featuredProductId: null
      },
      admin: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || '123456'
      }
    };
  }

  // اطمینان از وجود فیلدها
  db.data.products = db.data.products || [];
  db.data.categories = db.data.categories || [];
  db.data.knowledge = db.data.knowledge || [];
  db.data.reviews = db.data.reviews || [];
  db.data.settings = db.data.settings || { featuredProductId: null };

  await db.write();
  console.log('Database initialized successfully');
  return db;
}

module.exports = { db, initDB, uuidv4 };