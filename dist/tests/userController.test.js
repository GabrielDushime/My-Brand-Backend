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
                }
                else {
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
                return Object.assign({ _id: id }, update);
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
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
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
    }));
    it('should sign in a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/users/signin')
            .send({ email: 'existing_email@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
    it('should delete an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/api/users/existing_id');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    }));
    it('should update an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/api/users/existing_id')
            .send({ firstName: 'Updated', lastName: 'User' });
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Updated');
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); // Assuming there are users in the database
    }));
});
//# sourceMappingURL=userController.test.js.map