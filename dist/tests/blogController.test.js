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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mocking the BlogPost model
jest.mock('../models/Blog', () => {
    return {
        __esModule: true,
        default: {
            findById: jest.fn().mockImplementation(id => {
                // Mock finding a blog by ID
                if (id === 'existing_id') {
                    return {
                        _id: 'existing_id',
                        title: 'Test Blog',
                        description: 'This is a test blog',
                        image: 'test.jpg',
                        creationDate: new Date(),
                        comments: [],
                        likes: 0,
                        dislikes: 0
                    };
                }
                else {
                    return null; // Simulate blog not found
                }
            }),
            find: jest.fn().mockResolvedValue([
                {
                    _id: 'existing_id',
                    title: 'Test Blog 1',
                    description: 'This is a test blog 1',
                    image: 'test1.jpg',
                    creationDate: new Date(),
                    comments: [],
                    likes: 0,
                    dislikes: 0
                },
                {
                    _id: 'existing_id_2',
                    title: 'Test Blog 2',
                    description: 'This is a test blog 2',
                    image: 'test2.jpg',
                    creationDate: new Date(),
                    comments: [],
                    likes: 0,
                    dislikes: 0
                }
            ]),
            findByIdAndUpdate: jest.fn().mockImplementation((id, update) => {
                // Mock updating a blog by ID
                return Object.assign({ _id: id }, update);
            }),
            findByIdAndDelete: jest.fn().mockImplementation(id => {
                // Mock deleting a blog by ID
                return {
                    _id: id,
                    message: 'Blog deleted successfully'
                };
            }),
            save: jest.fn().mockResolvedValue({
                _id: 'new_id',
                title: 'New Test Blog',
                description: 'This is a new test blog',
                image: 'new_test.jpg',
                creationDate: new Date(),
                comments: [],
                likes: 0,
                dislikes: 0
            })
        }
    };
});
describe('Blog Controller', () => {
    it('should create a new blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/blogs')
            .send({ title: 'New Test Blog', description: 'This is a new test blog', image: 'new_test.jpg' });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('New Test Blog');
    }));
    it('should update an existing blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/api/blogs/existing_id')
            .send({ title: 'Updated Test Blog', description: 'This is an updated test blog', image: 'updated_test.jpg' });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Test Blog');
    }));
    it('should delete an existing blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/api/blogs/existing_id');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog deleted successfully');
    }));
    it('should get a blog by its ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/blogs/existing_id');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Test Blog');
    }));
    it('should add a comment to a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/blogs/existing_id/comments')
            .send({ fullName: 'John Doe', email: 'john@example.com', comment: 'This is a test comment' });
        expect(response.status).toBe(200);
        expect(response.body.comments.length).toBe(1);
        expect(response.body.comments[0].fullName).toBe('John Doe');
    }));
    it('should like a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/api/blogs/existing_id/like');
        expect(response.status).toBe(200);
        expect(response.body.likes).toBe(1);
    }));
    it('should dislike a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/api/blogs/existing_id/dislike');
        expect(response.status).toBe(200);
        expect(response.body.dislikes).toBe(1);
    }));
    it('should get all comments for a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/blogs/existing_id/comments');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].comment).toBe('This is a test comment');
    }));
    it('should get all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/blogs');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    }));
    it('should get all comments for all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/comments');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2); // Assuming 2 blogs with 1 comment each
    }));
    it('should delete a comment from a blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/api/blogs/existing_id/comments/comment_id');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Comment deleted successfully');
    }));
});
//# sourceMappingURL=blogController.test.js.map