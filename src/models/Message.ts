

import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  username: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
