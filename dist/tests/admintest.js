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
const app_1 = __importDefault(require("../app"));
const Admin_1 = __importDefault(require("../models/Admin"));
describe('Admin Controller', () => {
    let adminId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const admin = new Admin_1.default({
            username: 'testAdmin',
            email: 'test@example.com',
            password: 'password'
        });
        yield admin.save();
        adminId = admin._id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Admin_1.default.deleteMany({});
    }));
    it('should create a new admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/admin/signup')
            .send({ username: 'newAdmin', email: 'newadmin@example.com', password: 'password' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Admin created successfully');
    }));
    it('should signin an existing admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/admin/signin')
            .send({ email: 'test@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
    }));
    it('should update an existing admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/admin/${adminId}`)
            .send({ username: 'updatedAdmin', email: 'updated@example.com', password: 'newpassword' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Admin updated successfully');
    }));
    it('should delete an existing admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/admin/${adminId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Admin deleted successfully');
    }));
    it('should get all admins', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/admins');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }));
});
//# sourceMappingURL=admintest.js.map