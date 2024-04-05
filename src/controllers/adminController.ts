

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // Save admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error in admin signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const adminSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in admin signin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;
    const { username, email, password } = req.body;

    // Update admin in the database
    await Admin.findByIdAndUpdate(adminId, { username, email, password });

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error in updating admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;

    // Delete admin from the database
    await Admin.findByIdAndDelete(adminId);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error in deleting admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    // Get all admins from the database
    const admins = await Admin.find();

    res.status(200).json(admins);
  } catch (error) {
    console.error('Error in getting all admins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


