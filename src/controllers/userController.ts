import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();



export const userSignup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword, role: 'user' });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error:any) {
    console.error('Signup failed:', error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};


export const userSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || '', {
        expiresIn: '1h', 
      });
      
     
      return res.status(200).json({ token, user: { role: 'admin' } });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

   
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });

   
    res.status(200).json({ token, user });
  } catch (error:any) {
    console.error('Signin failed:', error);
    res.status(500).json({ message: 'Signin failed', error: error.message });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error });
  }
};
