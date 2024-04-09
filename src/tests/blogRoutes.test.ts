import request from 'supertest';
import express from 'express';
import blogRoutes from '../routes/blogRoutes';

const app = express();
app.use(express.json());
app.use('/api/blogs', blogRoutes);

describe('Blog Routes', () => {
  it('should create a new blog', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .send({ title: 'New Test Blog', description: 'This is a new test blog', image: 'new_test.jpg' });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Test Blog');
  });

  it('should update an existing blog', async () => {
    const response = await request(app)
      .put('/api/blogs/existing_id')
      .send({ title: 'Updated Test Blog', description: 'This is an updated test blog', image: 'updated_test.jpg' });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Blog');
  });

  it('should delete an existing blog', async () => {
    const response = await request(app).delete('/api/blogs/existing_id');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Blog deleted successfully');
  });

  it('should get a blog by its ID', async () => {
    const response = await request(app).get('/api/blogs/existing_id');
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Blog');
  });

  it('should add a comment to a blog', async () => {
    const response = await request(app)
      .post('/api/blogs/existing_id/comments')
      .send({ fullName: 'John Doe', email: 'john@example.com', comment: 'This is a test comment' });
    expect(response.status).toBe(200);
    expect(response.body.comments.length).toBe(1);
    expect(response.body.comments[0].fullName).toBe('John Doe');
  });

  it('should like a blog', async () => {
    const response = await request(app).post('/api/blogs/existing_id/like');
    expect(response.status).toBe(200);
    expect(response.body.likes).toBe(1);
  });

  it('should dislike a blog', async () => {
    const response = await request(app).post('/api/blogs/existing_id/dislike');
    expect(response.status).toBe(200);
    expect(response.body.dislikes).toBe(1);
  });

  it('should get all comments for a blog', async () => {
    const response = await request(app).get('/api/blogs/existing_id/comments');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].comment).toBe('This is a test comment');
  });

  it('should get all blogs', async () => {
    const response = await request(app).get('/api/blogs');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should get all comments for all blogs', async () => {
    const response = await request(app).get('/api/comments');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2); // Assuming 2 blogs with 1 comment each
  });

  it('should delete a comment from a blog', async () => {
    const response = await request(app).delete('/api/blogs/existing_id/comments/comment_id');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Comment deleted successfully');
  });
});
