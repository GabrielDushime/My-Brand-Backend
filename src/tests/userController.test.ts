import request from 'supertest';
import express from 'express';
import {
  userSignup,
  userSignin,
  deleteUser,
  updateUser,
  getAllUsers
} from '../controllers/userController';

const app = express();
app.use(express.json());

// Mocking the User model
jest.mock('../models/User', () => {
  return {
    __esModule: true,
    default: {
      findOne: jest.fn().mockImplementation(({ email }) => {
        // Mock finding a user by email
        if (email === 'existing_email@example.com') {
          return {
            _id: 'existing_id',
            firstName: 'John',
            lastName: 'Doe',
            email: 'existing_email@example.com',
            password: '$2a$10$hash', // Replace with hashed password
          };
        } else {
          return null; // Simulate user not found
        }
      }),
      findByIdAndDelete: jest.fn().mockImplementation(id => {
        // Mock deleting a user by ID
        return {
          _id: id,
          message: 'User deleted successfully'
        };
      }),
      findByIdAndUpdate: jest.fn().mockImplementation((id, update) => {
        // Mock updating a user by ID
        return {
          _id: id,
          ...update
        };
      }),
      find: jest.fn().mockResolvedValue([
        {
          _id: 'existing_id_1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: '$2a$10$hash',
        },
        {
          _id: 'existing_id_2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          password: '$2a$10$hash',
        }
      ]),
      save: jest.fn().mockResolvedValue({
        _id: 'new_id',
        firstName: 'New',
        lastName: 'User',
        email: 'new_user@example.com',
        password: '$2a$10$hash', // Replace with hashed password
      })
    }
  };
});

describe('User Controller', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        firstName: 'New',
        lastName: 'User',
        email: 'new_user@example.com',
        password: 'password',
        confirmPassword: 'password'
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should sign in a user', async () => {
    const response = await request(app)
      .post('/api/users/signin')
      .send({ email: 'existing_email@example.com', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should delete an existing user', async () => {
    const response = await request(app).delete('/api/users/existing_id');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should update an existing user', async () => {
    const response = await request(app)
      .put('/api/users/existing_id')
      .send({ firstName: 'Updated', lastName: 'User' });
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Updated');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Assuming there are users in the database
  });
});
