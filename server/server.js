const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
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

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/artworks', artworkRoutes);

// root route (added)
app.get('/', (req, res) => {
  res.send('AK Arts 05 API is running');
});

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AK Arts 05 backend' });
});

// 404 handler (added)
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// global error handler fallback
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
