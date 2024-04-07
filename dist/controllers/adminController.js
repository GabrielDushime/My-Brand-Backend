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
exports.createMasterAdmin = exports.getAllAdmins = exports.deleteAdmin = exports.updateAdmin = exports.adminSignin = exports.adminSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if admin already exists
        const existingAdmin = yield Admin_1.default.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new admin
        const newAdmin = new Admin_1.default({
            username,
            email,
            password: hashedPassword,
        });
        // Save admin to the database
        yield newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    }
    catch (error) {
        console.error('Error in admin signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.adminSignup = adminSignup;
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if admin exists
        const admin = yield Admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        // Check if password is correct
        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jsonwebtoken_1.default.sign({ email: admin.email }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error in admin signin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.adminSignin = adminSignin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        const { username, email, password } = req.body;
        // Update admin in the database
        yield Admin_1.default.findByIdAndUpdate(adminId, { username, email, password });
        res.status(200).json({ message: 'Admin updated successfully' });
    }
    catch (error) {
        console.error('Error in updating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminId } = req.params;
        // Delete admin from the database
        yield Admin_1.default.findByIdAndDelete(adminId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    }
    catch (error) {
        console.error('Error in deleting admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteAdmin = deleteAdmin;
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all admins from the database
        const admins = yield Admin_1.default.find();
        res.status(200).json(admins);
    }
    catch (error) {
        console.error('Error in getting all admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllAdmins = getAllAdmins;
const createMasterAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if master admin already exists
        const existingAdmin = yield Admin_1.default.findOne({ email: process.env.MASTER_ADMIN_EMAIL });
        if (existingAdmin) {
            console.log('Master Admin Saved to the Database.');
            return;
        }
        // Check if MASTER_ADMIN_PASSWORD environment variable is set
        if (!process.env.MASTER_ADMIN_PASSWORD) {
            console.error('MASTER_ADMIN_PASSWORD environment variable is not set.');
            return;
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(process.env.MASTER_ADMIN_PASSWORD, 8);
        // Create the master admin object
        const masterAdmin = new Admin_1.default({
            username: process.env.MASTER_ADMIN_USERNAME,
            email: process.env.MASTER_ADMIN_EMAIL,
            password: hashedPassword
        });
        // Save the master admin to the database
        yield masterAdmin.save();
        console.log('Master admin created successfully.');
    }
    catch (error) {
        console.error('Error creating master admin:', error);
    }
});
exports.createMasterAdmin = createMasterAdmin;
//# sourceMappingURL=adminController.js.map