const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const artworkRoutes = require('./routes/artworkRoutes');

const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/artworks', artworkRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AK Arts 05 backend' });
});

// global error handler fallback
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
