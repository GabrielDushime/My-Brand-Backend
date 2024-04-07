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
const chai_1 = require("chai");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const userController_1 = require("../controllers/userController");
describe('User Controller', () => {
    let userId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create a sample user for testing
        const hashedPassword = yield bcryptjs_1.default.hash('password123', 10);
        const user = new User_1.default({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: hashedPassword
        });
        yield user.save();
        userId = user._id.toString();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clean up the database after each test
        yield User_1.default.deleteMany({});
    }));
    describe('User Signup', () => {
        it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    firstName: 'Alice',
                    lastName: 'Smith',
                    email: 'alice@example.com',
                    password: 'password456',
                    confirmPassword: 'password456'
                }
            };
            const res = {
                status: (status) => res,
                json: (data) => {
                    (0, chai_1.expect)(status).to.equal(201);
                    (0, chai_1.expect)(data).to.have.property('message', 'User created successfully');
                }
            };
            yield (0, userController_1.userSignup)(req, res);
        }));
    });
    describe('User Signin', () => {
        it('should sign in an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    email: 'john@example.com',
                    password: 'password123'
                }
            };
            const res = {
                status: (status) => res,
                json: (data) => {
                    (0, chai_1.expect)(status).to.equal(200);
                    (0, chai_1.expect)(data).to.have.property('token').to.be.a('string');
                }
            };
            yield (0, userController_1.userSignin)(req, res);
        }));
    });
    describe('Delete User', () => {
        it('should delete an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                params: {
                    userId
                }
            };
            const res = {
                status: (status) => res,
                json: (data) => {
                    (0, chai_1.expect)(status).to.equal(200);
                    (0, chai_1.expect)(data).to.have.property('message', 'User deleted successfully');
                }
            };
            yield (0, userController_1.deleteUser)(req, res);
        }));
    });
    describe('Update User', () => {
        it('should update an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                params: {
                    userId
                },
                body: {
                    firstName: 'UpdatedFirstName',
                    lastName: 'UpdatedLastName',
                    email: 'UpdatedEmail',
                    password: 'UpdatedPassword',
                }
            };
            const res = {
                status: (status) => res,
                json: (data) => {
                    (0, chai_1.expect)(status).to.equal(200);
                    (0, chai_1.expect)(data).to.have.property('message', 'User updated successfully');
                }
            };
            yield (0, userController_1.updateUser)(req, res);
        }));
    });
    describe('Get All Users', () => {
        it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {};
            const res = {
                status: (status) => res,
                json: (data) => {
                    (0, chai_1.expect)(status).to.equal(200);
                    (0, chai_1.expect)(data).to.be.an('array').that.is.not.empty;
                }
            };
            yield (0, userController_1.getAllUsers)(req, res);
        }));
    });
});
//# sourceMappingURL=userController.test.js.map