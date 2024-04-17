import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/User';

dotenv.config();


let db: typeof mongoose;

const connectDB = async () => {
 if (db) {
    return db;
 }

 try {
    const connection = await mongoose.connect('mongodb://localhost:27017/My-Brand-Backend');
    console.log('MongoDB connected');
    db = connection;
    return db;
 } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
 }
};

export const addAdminCredentials = async () => {
 try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminFirstName = process.env.ADMIN_FIRST_NAME;
    const adminLastName = process.env.ADMIN_LAST_NAME;

    if (!adminEmail || !adminPassword || !adminFirstName || !adminLastName) {
      throw new Error('Admin credentials not found in .env file');
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const newAdmin = new User({
        email: adminEmail,
        password: hashedPassword,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: 'admin',
      });

      await newAdmin.save();

      console.log('Admin credentials saved in the database');
    } else {
      console.log('Admin credentials already exist in the database');
    }
 } catch (error) {
    console.error('Error adding admin credentials to the database:', error);
    throw error;
 }
};
