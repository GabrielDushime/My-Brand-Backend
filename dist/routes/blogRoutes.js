"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const multer_1 = __importDefault(require("multer"));
const blogRoutes = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Blog routes
blogRoutes.post('/', upload.single('image'), blogController_1.createBlog);
blogRoutes.put('/:id', blogController_1.updateBlog);
blogRoutes.delete('/:id', blogController_1.deleteBlog);
blogRoutes.get('/:id', blogController_1.getBlogById);
blogRoutes.get('/', blogController_1.getAllBlogs);
// Comments Routes
blogRoutes.post('/:id/comments', blogController_1.commentOnBlog);
blogRoutes.get('/:id/comments', blogController_1.getCommentsForBlog);
blogRoutes.get('/comments', blogController_1.getAllComments);
blogRoutes.delete('/:blogId/comments/:commentId', blogController_1.deleteComment);
// Likes & Dislikes Routes
blogRoutes.post('/:id/like', blogController_1.likeBlog);
blogRoutes.post('/:id/dislike', blogController_1.dislikeBlog);
exports.default = blogRoutes;
//# sourceMappingURL=blogRoutes.js.map