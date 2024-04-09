import request from 'supertest';
import app from '../app'
import Admin from '../models/Admin';

describe('Admin Controller', () => {
  let adminId: string;

  beforeAll(async () => {
   
    const admin = new Admin({
      username: 'testAdmin',
      email: 'test@example.com',
      password: 'password'
    });
    await admin.save();
    adminId = admin._id;
  });

  afterAll(async () => {
    
    await Admin.deleteMany({});
  });

  it('should create a new admin', async () => {
    const response = await request(app)
      .post('/api/admin/signup')
      .send({ username: 'newAdmin', email: 'newadmin@example.com', password: 'password' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Admin created successfully');
  });

  it('should signin an existing admin', async () => {
    const response = await request(app)
      .post('/api/admin/signin')
      .send({ email: 'test@example.com', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it('should update an existing admin', async () => {
    const response = await request(app)
      .put(`/api/admin/${adminId}`)
      .send({ username: 'updatedAdmin', email: 'updated@example.com', password: 'newpassword' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin updated successfully');
  });

  it('should delete an existing admin', async () => {
    const response = await request(app)
      .delete(`/api/admin/${adminId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin deleted successfully');
  });

  it('should get all admins', async () => {
    const response = await request(app)
      .get('/api/admins');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
