"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const messageRoutes = express_1.default.Router();
messageRoutes.post('/', messageController_1.createMessage);
messageRoutes.put('/:messageId', messageController_1.updateMessage);
messageRoutes.delete('/:messageId', messageController_1.deleteMessage);
messageRoutes.get('/', messageController_1.getAllMessages);
exports.default = messageRoutes;
//# sourceMappingURL=messageRoutes.js.map