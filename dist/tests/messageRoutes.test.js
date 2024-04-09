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
const messageRoutes_1 = __importDefault(require("../routes/messageRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/messages', messageRoutes_1.default);
describe('Message Routes', () => {
    it('should create a new message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/messages')
            .send({ username: 'testuser', email: 'test@example.com', message: 'Test message content' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Message created successfully');
    }));
    it('should update an existing message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/api/messages/message_id')
            .send({ username: 'testuser', email: 'test@example.com', message: 'Updated message content' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Message updated successfully');
    }));
    it('should delete an existing message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/api/messages/message_id');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Message deleted successfully');
    }));
    it('should get all messages', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/messages');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); // Assuming there are messages in the database
    }));
});
//# sourceMappingURL=messageRoutes.test.js.map