// src/controllers/messageController.ts

import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { username, email, message } = req.body;
    console.log('Received data:', req.body);
    const newMessage: IMessage = new Message({
      username,
      email,
      message
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message created successfully' });
  } catch (error) {
    console.error('Error in creating message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.messageId;
    const { username, email, message } = req.body;

    await Message.findByIdAndUpdate(messageId, { username, email, message });

    res.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error in updating message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.messageId;

    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error in deleting message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error in getting all messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
