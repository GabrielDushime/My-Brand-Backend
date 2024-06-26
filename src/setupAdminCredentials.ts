import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/User'; 

dotenv.config();

export const addAdminCredentials = async () => {
 try {
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

      console.log('Admin credential saved in the database');
    } else {
      console.log('Admin credentials already saved in the database');
    }
 } catch (error) {
    console.error('Error adding admin credentials to the database:', error);
    throw error;
 }
};
