import express from 'express';
import { createBlog,updateBlog,deleteBlog,getBlogById,commentOnBlog,likeBlog,dislikeBlog,getCommentsForBlog,getAllBlogs,getAllComments,deleteComment} from '../controllers/blogController';

const blogRoutes = express.Router();

//Blog routes

blogRoutes.post('/api/blogs', createBlog);
blogRoutes.put('/api/blogs/:id', updateBlog);
blogRoutes.delete('/api/blogs/:id', deleteBlog);
blogRoutes.get('/api/blogs/:id', getBlogById);
blogRoutes.get('/api/blogs', getAllBlogs);

//Comments Routes

blogRoutes.post('/api/blogs/:id/comments', commentOnBlog);
blogRoutes.get('/api/blogs/:id/comments', getCommentsForBlog);
blogRoutes.get('/api/comments', getAllComments);
blogRoutes.delete('/api/blogs/:blogId/comments/:commentId', deleteComment);

//Likes & Dislikes Routes
blogRoutes.post('/api/blogs/:id/like', likeBlog);
blogRoutes.post('/api/blogs/:id/dislike', dislikeBlog);




export default blogRoutes;
