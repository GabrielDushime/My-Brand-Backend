import express from 'express';
import { createBlog, updateBlog, deleteBlog, getBlogById, commentOnBlog, likeBlog, dislikeBlog, getCommentsForBlog, getAllBlogs, getAllComments, deleteComment } from '../controllers/blogController';
import multer from 'multer';

const blogRoutes = express.Router();
const upload = multer({ dest: 'uploads/' });
// Blog routes
blogRoutes.post('/', upload.single('image'), createBlog);
blogRoutes.put('/:id', updateBlog);
blogRoutes.delete('/:id', deleteBlog);
blogRoutes.get('/:id', getBlogById);
blogRoutes.get('/', getAllBlogs);

// Comments Routes
blogRoutes.post('/:id/comments', commentOnBlog);
blogRoutes.get('/:id/comments', getCommentsForBlog);
blogRoutes.get('/comments', getAllComments);
blogRoutes.delete('/:blogId/comments/:commentId', deleteComment);

// Likes & Dislikes Routes
blogRoutes.post('/:id/like', likeBlog);
blogRoutes.post('/:id/dislike', dislikeBlog);

export default blogRoutes;
