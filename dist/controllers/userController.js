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
exports.getAllUsers = exports.updateUser = exports.deleteUser = exports.userSignin = exports.userSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ firstName, lastName, email, password: hashedPassword, role: 'user' });
        yield user.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error('Signup failed:', error);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
});
exports.userSignup = userSignup;
const userSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jsonwebtoken_1.default.sign({ role: 'admin' }, process.env.JWT_SECRET || '', {
                expiresIn: '1h',
            });
            return res.status(200).json({ token, user: { role: 'admin' } });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || '', {
            expiresIn: '1h',
        });
        res.status(200).json({ token, user });
    }
    catch (error) {
        console.error('Signin failed:', error);
        res.status(500).json({ message: 'Signin failed', error: error.message });
    }
});
exports.userSignin = userSignin;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield User_1.default.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update user', error });
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        const count = yield User_1.default.countDocuments();
        res.status(200).json({ users, count });
    }
    catch (error) {
        console.error('Failed to get users:', error);
        res.status(500).json({ message: 'Failed to get users', error });
    }
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.js.map