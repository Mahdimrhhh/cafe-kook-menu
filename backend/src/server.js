const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { initDB } = require('./database/db');
const config = require('./config');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const otherRoutes = require('./routes/otherRoutes');

const app = express();
const PORT = config.PORT;

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:8080'
    ],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', otherRoutes);

// مسیرهای عمومی
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// مسیر آپلود فقط برای ادمین
app.use('/api/upload', authMiddleware, uploadRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Cafe Kook Backend is running!',
    status: 'ok'
  });
});

async function startServer() {
  try {
    await initDB();
    console.log('Database ready');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();