// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'admin'; 
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
