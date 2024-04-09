import request from 'supertest';
import express from 'express';
import adminRoutes from '../routes/adminRoutes';

const app = express();
app.use(express.json());
app.use('/api/admin', adminRoutes);

describe('Admin Routes', () => {
  it('should sign up a new admin', async () => {
    const response = await request(app)
      .post('/api/admin/signup')
      .send({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });
    expect(response.status).toBe(201);
  });

  it('should sign in an admin', async () => {
    const response = await request(app)
      .post('/api/admin/signin')
      .send({ email: 'test@example.com', password: 'testpassword' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should update an admin', async () => {
    const response = await request(app)
      .put('/api/admin/adminId')
      .send({ username: 'updateduser', email: 'updated@example.com', password: 'updatedpassword' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin updated successfully');
  });

  it('should delete an admin', async () => {
    const response = await request(app).delete('/api/admin/adminId');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin deleted successfully');
  });

  it('should get all admins', async () => {
    const response = await request(app).get('/api/admin');
    expect(response.status).toBe(200);
    // Assert more about the response body if needed
  });
});
