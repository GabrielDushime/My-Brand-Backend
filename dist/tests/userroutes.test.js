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
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
describe('User Routes', () => {
    it('should handle user signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/users/signup')
            .send({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', confirmPassword: 'password' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    }));
    it('should handle user signin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/users/signin')
            .send({ email: 'john@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
    it('should handle deleting a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/api/users/some_user_id');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    }));
    it('should handle updating a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/api/users/some_user_id')
            .send({ firstName: 'Updated', lastName: 'User' });
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Updated');
    }));
    it('should handle getting all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }));
});
//# sourceMappingURL=userroutes.test.js.map