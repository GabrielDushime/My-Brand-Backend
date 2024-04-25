"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getAllComments = exports.getAllBlogs = exports.getCommentsForBlog = exports.dislikeBlog = exports.likeBlog = exports.commentOnBlog = exports.getBlogById = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
// Function to create a new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.path : undefined;
        // Upload image to Cloudinary
        let cloudinaryResponse;
        if (image) {
            cloudinaryResponse = yield cloudinary_1.default.v2.uploader.upload(image);
            fs_1.default.unlinkSync(image);
        }
        const newBlogData = {
            title,
            description,
            creationDate: new Date(),
            comments: [],
            likes: 0,
            dislikes: 0
        };
        // If image was uploaded to Cloudinary, store its URL in the database
        if (cloudinaryResponse) {
            newBlogData.image = cloudinaryResponse.secure_url;
        }
        const newBlog = new Blog_1.default(newBlogData);
        yield newBlog.save();
        res.status(201).json(newBlog);
    }
    catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createBlog = createBlog;
// Function to update an existing blog
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(id, { title, description, image }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateBlog = updateBlog;
// Function to delete a blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedBlog = yield Blog_1.default.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteBlog = deleteBlog;
// Function to get a single blog by its ID
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield Blog_1.default.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        console.error('Error getting blog by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getBlogById = getBlogById;
// Function to add a comment to a blog
const commentOnBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { fullName, email, comment } = req.body;
        const newComment = { fullName, email, comment, creationDate: new Date() };
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(id, { $push: { comments: newComment } }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.error('Error adding comment to blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.commentOnBlog = commentOnBlog;
// Function to add a like to a blog
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.likeBlog = likeBlog;
// Function to add a dislike to a blog
const dislikeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.error('Error disliking blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.dislikeBlog = dislikeBlog;
// Function to get all comments for a single blog
const getCommentsForBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield Blog_1.default.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog.comments);
    }
    catch (error) {
        console.error('Error getting comments for blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getCommentsForBlog = getCommentsForBlog;
// Function to get all blogs
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find();
        res.status(200).json(blogs);
    }
    catch (error) {
        console.error('Error getting all blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllBlogs = getAllBlogs;
// Function to get all comments for all blogs
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find();
        const blogsWithComments = blogs.map(blog => ({
            Blog_id: blog._id,
            Blog_title: blog.title,
            Blog_description: blog.description,
            Blog_comments: blog.comments
        }));
        res.status(200).json(blogsWithComments);
    }
    catch (error) {
        console.error('Error getting all comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllComments = getAllComments;
// Function to delete a comment from a blog
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId, commentId } = req.params;
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(blogId, { $pull: { comments: { _id: commentId } } }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully', updatedBlog });
    }
    catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=blogController.js.map