import { Request, Response } from 'express';
import BlogPost, { IBlogPost,IComment } from '../models/Blog';

// Function to create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, image } = req.body;
    const newBlog: IBlogPost = new BlogPost({
      title,
      description,
      image,
      creationDate: new Date(),
      comments: [],
      likes: 0,
      dislikes: 0
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an existing blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const updatedBlog = await BlogPost.findByIdAndUpdate(id, { title, description, image }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogPost.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get a single blog by its ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error getting blog by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to add a comment to a blog
export const commentOnBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, email, comment } = req.body;
    const newComment = { fullName, email, comment, creationDate: new Date() };
    const updatedBlog = await BlogPost.findByIdAndUpdate(id, { $push: { comments: newComment } }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error adding comment to blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to add a like to a blog
export const likeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogPost.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to add a dislike to a blog
export const dislikeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogPost.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error disliking blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all comments for a single blog
export const getCommentsForBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog.comments);
  } catch (error) {
    console.error('Error getting comments for blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogPost.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting all blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all comments for all blogs
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogPost.find();
    const blogsWithComments = blogs.map(blog => ({
      Blog_id: blog._id,
     Blog_title: blog.title,
      Blog_description: blog.description,
      Blog_comments: blog.comments
    }));
    res.status(200).json(blogsWithComments);
  } catch (error) {
    console.error('Error getting all comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete a comment from a blog
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { blogId, commentId } = req.params;
    const updatedBlog = await BlogPost.findByIdAndUpdate(blogId, { $pull: { comments: { _id: commentId } } }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully', updatedBlog });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  