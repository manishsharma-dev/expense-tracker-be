require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const { csrfProtection } = require('./middlewares/csrfProtection');
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

const getClientIp = (req) => {
  const forwardedFor = `${req.headers['x-forwarded-for'] || ''}`
    .split(',')[0]
    .trim();
  return forwardedFor || req.ip;
};

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

const createRateLimiter = ({ windowMs, max, message }) => rateLimit({
  windowMs,
  max,
  keyGenerator: (req) => getClientIp(req),
  skip: (req) => req.method === 'OPTIONS' || req.path.endsWith('/health'),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message },
});

const generalLimiter = createRateLimiter({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 1000,
  message: 'Too many requests, please try again later.',
});

const authLimiter = createRateLimiter({
  windowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 10,
  message: 'Too many authentication attempts, please try again later.',
});

// Rate limiting
app.use('/api/v1/auth/otp/request', authLimiter);
app.use('/api/v1/auth/otp/verify', authLimiter);
app.use('/api/v1/auth/register', authLimiter);
app.use(generalLimiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const csrfExemptPaths = new Set([
  '/auth/register',
  '/auth/otp/request',
  '/auth/otp/verify',
]);

// API routes
app.use('/api/v1', (req, res, next) => {
  if (csrfExemptPaths.has(req.path)) return next();
  return csrfProtection(req, res, next);
}, routes);

// 404 & global error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));
}

module.exports = app;
