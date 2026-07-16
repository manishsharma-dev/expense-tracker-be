const request = require('supertest');

jest.mock('../src/config/redis', () => ({
  getRedisClient: jest.fn(),
}));

const { getRedisClient } = require('../src/config/redis');
const app = require('../src/app');

describe('Health routes', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      REDIS_URL: 'redis://test-redis:6379',
      BREVO_API_KEY: 'test-brevo-key',
      SMTP_FROM_EMAIL: 'noreply@example.com',
      AWS_REGION: 'ap-south-1',
      AWS_S3_BUCKET: 'test-bucket',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('returns liveness without checking external dependencies', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      status: 'ok',
      service: 'expense-tracker-be',
    });
    expect(getRedisClient).not.toHaveBeenCalled();
  });

  it('returns 503 readiness when MongoDB is disconnected', async () => {
    getRedisClient.mockResolvedValue({ ping: jest.fn().mockResolvedValue('PONG') });

    const res = await request(app).get('/api/v1/health/readiness');

    expect(res.statusCode).toBe(503);
    expect(res.body.status).toBe('down');
    expect(res.body.requiredDown).toContain('mongodb');
    expect(res.body.checks.mongodb).toMatchObject({
      status: 'down',
      state: 'disconnected',
    });
    expect(res.body.checks.redis.status).toBe('ok');
    expect(res.body.checks.email.status).toBe('ok');
    expect(res.body.checks.s3.status).toBe('ok');
  });
});
