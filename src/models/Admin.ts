

import mongoose, { Schema, Document } from 'mongoose';

export interface AdminDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model<AdminDocument>('Admin', AdminSchema);

export default Admin;
