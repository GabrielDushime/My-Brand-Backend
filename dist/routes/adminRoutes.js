"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminRoutes = express_1.default.Router();
adminRoutes.post('/signup', adminController_1.adminSignup);
adminRoutes.post('/signin', adminController_1.adminSignin);
adminRoutes.put('/:adminId', adminController_1.updateAdmin);
adminRoutes.delete('/:adminId', adminController_1.deleteAdmin);
adminRoutes.get('/', adminController_1.getAllAdmins);
exports.default = adminRoutes;
//# sourceMappingURL=adminRoutes.js.map