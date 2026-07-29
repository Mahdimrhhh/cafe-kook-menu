const { db, uuidv4 } = require('../database/db');

// گرفتن همه دسته‌بندی‌ها
async function getAllCategories(req, res) {
  try {
    await db.read();
    res.json(db.data.categories);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت دسته‌بندی‌ها' });
  }
}

// ساخت دسته‌بندی جدید
async function createCategory(req, res) {
  try {
    await db.read();

    const newCategory = {
      id: uuidv4(),
      name: req.body.name,
      icon: req.body.icon || '',
      order: Number(req.body.order) || 0
    };

    db.data.categories.push(newCategory);
    await db.write();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ساخت دسته‌بندی' });
  }
}

// ویرایش دسته‌بندی
async function updateCategory(req, res) {
  try {
    await db.read();
    
    const index = db.data.categories.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'دسته‌بندی پیدا نشد' });
    }

    db.data.categories[index] = {
      ...db.data.categories[index],
      ...req.body,
      id: req.params.id
    };

    await db.write();
    res.json(db.data.categories[index]);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ویرایش دسته‌بندی' });
  }
}

// حذف دسته‌بندی
async function deleteCategory(req, res) {
  try {
    await db.read();
    
    const index = db.data.categories.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'دسته‌بندی پیدا نشد' });
    }

    db.data.categories.splice(index, 1);
    await db.write();

    res.json({ message: 'دسته‌بندی با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف دسته‌بندی' });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};