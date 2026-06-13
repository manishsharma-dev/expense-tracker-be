require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Trust Render/proxy headers for req.ip
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

const normalizeOrigin = (origin) => {
  if (!origin) return '';
  const value = origin.trim().replace(/^['"]|['"]$/g, '');

  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/+$/g, '');
  }
};

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4000,http://localhost:4200')
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

logger.info(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);

// CORS
app.use(cors({
  origin(origin, callback) {
    const requestOrigin = normalizeOrigin(origin);
    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) return callback(null, true);
    logger.warn(`Blocked CORS origin: ${requestOrigin || 'missing origin'}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Rate limiting
app.use(
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// API routes
app.use('/api/v1', routes);

// 404 & global error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));
}

module.exports = app;
