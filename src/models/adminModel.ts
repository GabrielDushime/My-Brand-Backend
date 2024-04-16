import mongoose, { Schema, Document } from 'mongoose';

export interface AdminDocument extends Document {
  email: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model<AdminDocument>('Admin', adminSchema);

export default Admin;
