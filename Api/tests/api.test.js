import request from 'supertest';
import app from '../index.js';

describe('Auth Endpoints', () => {
  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail login with missing fields', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@example.com'
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Campaign Endpoints', () => {
  it('should deny access to campaigns without token', async () => {
    const res = await request(app).get('/campaigns');
    expect(res.statusCode).toEqual(401);
  });
});
