import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  it('should handle user signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', confirmPassword: 'password' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should handle user signin', async () => {
    const response = await request(app)
      .post('/api/users/signin')
      .send({ email: 'john@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should handle deleting a user', async () => {
    const response = await request(app).delete('/api/users/some_user_id');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should handle updating a user', async () => {
    const response = await request(app)
      .put('/api/users/some_user_id')
      .send({ firstName: 'Updated', lastName: 'User' });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Updated');
  });

  it('should handle getting all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
