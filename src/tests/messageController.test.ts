import request from 'supertest';
import express from 'express';
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getAllMessages
} from '../controllers/messageController';

const app = express();
app.use(express.json());

// Mock the Message model
jest.mock('../models/Message', () => ({
  __esModule: true,
  default: {
    create: jest.fn().mockResolvedValue({
      _id: 'message_id',
      username: 'testuser',
      email: 'test@example.com',
      message: 'Test message content',
      createdAt: new Date(),
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: 'message_id',
      username: 'testuser',
      email: 'test@example.com',
      message: 'Updated message content',
      createdAt: new Date(),
    }),
    findByIdAndDelete: jest.fn().mockResolvedValue({
      _id: 'message_id',
      message: 'Message deleted successfully',
    }),
    find: jest.fn().mockResolvedValue([
      {
        _id: 'message_id_1',
        username: 'user1',
        email: 'user1@example.com',
        message: 'Message 1',
        createdAt: new Date(),
      },
      {
        _id: 'message_id_2',
        username: 'user2',
        email: 'user2@example.com',
        message: 'Message 2',
        createdAt: new Date(),
      }
    ]),
  },
}));

describe('Message Controller', () => {
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
    expect(response.body.length).toBe(2);
  });
});
