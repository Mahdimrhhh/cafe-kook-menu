const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// مسیرهای عمومی (همه می‌تونن ببینن)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// مسیرهای خصوصی (فقط ادمین)
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;