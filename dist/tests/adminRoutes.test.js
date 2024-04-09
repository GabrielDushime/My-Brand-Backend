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
const adminRoutes_1 = __importDefault(require("../routes/adminRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/admin', adminRoutes_1.default);
describe('Admin Routes', () => {
    it('should sign up a new admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/admin/signup')
            .send({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });
        expect(response.status).toBe(201);
    }));
    it('should sign in an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/admin/signin')
            .send({ email: 'test@example.com', password: 'testpassword' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
    it('should update an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/api/admin/adminId')
            .send({ username: 'updateduser', email: 'updated@example.com', password: 'updatedpassword' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Admin updated successfully');
    }));
    it('should delete an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/api/admin/adminId');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Admin deleted successfully');
    }));
    it('should get all admins', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/admin');
        expect(response.status).toBe(200);
        // Assert more about the response body if needed
    }));
});
//# sourceMappingURL=adminRoutes.test.js.map