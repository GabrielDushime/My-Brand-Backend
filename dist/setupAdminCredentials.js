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
exports.addAdminCredentials = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
let db;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (db) {
        return db;
    }
    try {
        const connection = yield mongoose_1.default.connect('mongodb://localhost:27017/My-Brand-Backend');
        console.log('MongoDB connected');
        db = connection;
        return db;
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
});
const addAdminCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminFirstName = process.env.ADMIN_FIRST_NAME;
        const adminLastName = process.env.ADMIN_LAST_NAME;
        if (!adminEmail || !adminPassword || !adminFirstName || !adminLastName) {
            throw new Error('Admin credentials not found in .env file');
        }
        const existingAdmin = yield User_1.default.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = yield bcryptjs_1.default.hash(adminPassword, 10);
            const newAdmin = new User_1.default({
                email: adminEmail,
                password: hashedPassword,
                firstName: adminFirstName,
                lastName: adminLastName,
                role: 'admin',
            });
            yield newAdmin.save();
            console.log('Admin credentials saved in the database');
        }
        else {
            console.log('Admin credentials already exist in the database');
        }
    }
    catch (error) {
        console.error('Error adding admin credentials to the database:', error);
        throw error;
    }
});
exports.addAdminCredentials = addAdminCredentials;
//# sourceMappingURL=setupAdminCredentials.js.map