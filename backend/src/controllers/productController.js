const { db, uuidv4 } = require('../database/db');

// گرفتن همه محصولات
async function getAllProducts(req, res) {
  try {
    await db.read();
    res.json(db.data.products);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت محصولات' });
  }
}

// گرفتن یک محصول با آی‌دی
async function getProductById(req, res) {
  try {
    await db.read();
    const product = db.data.products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت محصول' });
  }
}

// اضافه کردن محصول جدید
async function createProduct(req, res) {
  try {
    await db.read();

    const newProduct = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description || '',
      price: Number(req.body.price) || 0,
      categoryId: req.body.categoryId || null,
      image: req.body.image || '',
      available: req.body.available !== false,
      featured: req.body.featured === true,
      createdAt: new Date().toISOString()
    };

    db.data.products.push(newProduct);
    await db.write();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ساخت محصول' });
  }
}

// ویرایش محصول
async function updateProduct(req, res) {
  try {
    await db.read();
    
    const index = db.data.products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }

    const updatedProduct = {
      ...db.data.products[index],
      ...req.body,
      id: req.params.id, // آی‌دی تغییر نکنه
      price: req.body.price !== undefined ? Number(req.body.price) : db.data.products[index].price
    };

    db.data.products[index] = updatedProduct;
    await db.write();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ویرایش محصول' });
  }
}

// حذف محصول
async function deleteProduct(req, res) {
  try {
    await db.read();
    
    const index = db.data.products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }

    db.data.products.splice(index, 1);
    await db.write();

    res.json({ message: 'محصول با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف محصول' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};