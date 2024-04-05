
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  try {
    // Implement user signin logic
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Implement delete user logic
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // Implement update user logic
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Implement get all users logic
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error });
  }
};
