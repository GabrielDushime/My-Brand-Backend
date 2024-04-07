import express from 'express';
import { createMessage, updateMessage, deleteMessage, getAllMessages } from '../controllers/messageController';

const messageRoutes = express.Router();

messageRoutes.post('/', createMessage);
messageRoutes.put('/:messageId', updateMessage);
messageRoutes.delete('/:messageId', deleteMessage);
messageRoutes.get('/', getAllMessages);

export default messageRoutes;
