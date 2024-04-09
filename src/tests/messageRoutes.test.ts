import request from 'supertest';
import express from 'express';
import messageRoutes from '../routes/messageRoutes';

const app = express();
app.use(express.json());
app.use('/api/messages', messageRoutes);

describe('Message Routes', () => {
  it('should create a new message', async () => {
    const response = await request(app)
      .post('/api/messages')
      .send({ username: 'testuser', email: 'test@example.com', message: 'Test message content' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Message created successfully');
  });

  it('should update an existing message', async () => {
    const response = await request(app)
      .put('/api/messages/message_id')
      .send({ username: 'testuser', email: 'test@example.com', message: 'Updated message content' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Message updated successfully');
  });

  it('should delete an existing message', async () => {
    const response = await request(app).delete('/api/messages/message_id');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Message deleted successfully');
  });

  it('should get all messages', async () => {
    const response = await request(app).get('/api/messages');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Assuming there are messages in the database
  });
});
