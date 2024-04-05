

import express from 'express';
import { createMessage, updateMessage, deleteMessage, getAllMessages } from '../controllers/messageController';



const messageRoutes = express.Router();


 messageRoutes.post('/api/messages', createMessage);
 messageRoutes.put('/api/messages/:messageId', updateMessage);
 messageRoutes.delete('/api/messages/:messageId', deleteMessage);
 messageRoutes.get('/api/messages', getAllMessages);



export default  messageRoutes;
