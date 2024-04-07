"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRoutes = express_1.default.Router();
userRoutes.post('/signup', userController_1.userSignup);
userRoutes.post('/signin', userController_1.userSignin);
userRoutes.delete('/:userId', userController_1.deleteUser);
userRoutes.put('/:userId', userController_1.updateUser);
userRoutes.get('/', userController_1.getAllUsers);
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map