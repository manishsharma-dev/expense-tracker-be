const mongoose = require('mongoose');
const { getRedisClient } = require('../config/redis');

const withTimeout = (promise, timeoutMs, label) => Promise.race([
  promise,
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
  }),
]);

const mongoStateMap = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

const env = (key) => process.env[key]?.trim();

const checkMongo = () => {
  const readyState = mongoose.connection.readyState;
  const state = mongoStateMap[readyState] || 'unknown';

  return {
    status: readyState === 1 ? 'ok' : 'down',
    state,
    host: mongoose.connection.host || null,
    database: mongoose.connection.name || null,
  };
};

const checkRedis = async () => {
  if (!env('REDIS_URL')) {
    return {
      status: process.env.NODE_ENV === 'production' ? 'down' : 'not_configured',
      message: 'REDIS_URL is not configured',
    };
  }

  try {
    const client = await withTimeout(getRedisClient(), 1500, 'Redis connection');
    const pong = await withTimeout(client.ping(), 1500, 'Redis ping');
    return {
      status: pong === 'PONG' ? 'ok' : 'degraded',
      message: pong,
    };
  } catch (error) {
    return {
      status: 'down',
      message: error.message,
    };
  }
};

const checkEmail = () => {
  const hasBrevoApi = Boolean(env('BREVO_API_KEY'));
  const hasSmtp = Boolean(env('MAIL_HOST') && env('SMTP_PORT') && env('SMTP_EMAIL') && (env('SMTP_PASSWORD') || env('PASSWORD')));
  const hasSender = Boolean(env('SMTP_FROM_EMAIL') || env('SMTP_EMAIL'));

  return {
    status: (hasBrevoApi || hasSmtp) && hasSender ? 'ok' : 'not_configured',
    provider: hasBrevoApi ? 'brevo_api' : 'smtp',
    senderConfigured: hasSender,
  };
};

const checkS3 = () => {
  const required = ['AWS_REGION', 'AWS_S3_BUCKET'];
  const missing = required.filter((key) => !env(key));

  return {
    status: missing.length ? 'not_configured' : 'ok',
    bucketConfigured: Boolean(env('AWS_S3_BUCKET')),
    publicBaseUrlConfigured: Boolean(env('AWS_S3_PUBLIC_BASE_URL')),
    missing,
  };
};

const getLiveness = () => ({
  success: true,
  status: 'ok',
  service: 'expense-tracker-be',
  timestamp: new Date().toISOString(),
  uptimeSeconds: Math.round(process.uptime()),
});

const getReadiness = async () => {
  const checks = {
    runtime: {
      status: 'ok',
      nodeEnv: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.round(process.uptime()),
    },
    mongodb: checkMongo(),
    redis: await checkRedis(),
    email: checkEmail(),
    s3: checkS3(),
  };

  const requiredDown = ['mongodb', 'redis'].filter((key) => checks[key].status === 'down');
  const degraded = Object.values(checks).some((check) => ['degraded', 'not_configured'].includes(check.status));
  const status = requiredDown.length ? 'down' : degraded ? 'degraded' : 'ok';

  return {
    success: status !== 'down',
    status,
    requiredDown,
    checks,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  getLiveness,
  getReadiness,
};
