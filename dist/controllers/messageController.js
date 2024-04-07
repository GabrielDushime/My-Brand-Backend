"use strict";
// src/controllers/messageController.ts
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
exports.getAllMessages = exports.deleteMessage = exports.updateMessage = exports.createMessage = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, message } = req.body;
        const newMessage = new Message_1.default({
            username,
            email,
            message
        });
        yield newMessage.save();
        res.status(201).json({ message: 'Message created successfully' });
    }
    catch (error) {
        console.error('Error in creating message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createMessage = createMessage;
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        const { username, email, message } = req.body;
        yield Message_1.default.findByIdAndUpdate(messageId, { username, email, message });
        res.status(200).json({ message: 'Message updated successfully' });
    }
    catch (error) {
        console.error('Error in updating message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateMessage = updateMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        yield Message_1.default.findByIdAndDelete(messageId);
        res.status(200).json({ message: 'Message deleted successfully' });
    }
    catch (error) {
        console.error('Error in deleting message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteMessage = deleteMessage;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Message_1.default.find();
        res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error in getting all messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllMessages = getAllMessages;
//# sourceMappingURL=messageController.js.map