const request = require('supertest');
const app = require('../src/app');

describe('Auth Routes', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: 'Test User',
        email: 'not-an-email',
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/v1/auth/otp/request', () => {
    it('should return 400 if identifier is missing', async () => {
      const res = await request(app).post('/api/v1/auth/otp/request').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/otp/verify', () => {
    it('should return 400 if OTP payload is missing', async () => {
      const res = await request(app).post('/api/v1/auth/otp/verify').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/health', () => {
    it('should return 200 health check', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
