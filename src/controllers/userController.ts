import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Admin from '../models/Admin';

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
    const user = new User({ firstName, lastName, email, password: hashedPassword });
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
 
   
     const user = await User.findOne({ email });
     const admin = await Admin.findOne({ email }); 
 
     
     if (!user && !admin) {
       return res.status(404).json({ message: 'User not found' });
     }
 
   
     let passwordMatch = false;
     if (user) {
       passwordMatch = await bcrypt.compare(password, user.password);
     } else if (admin) {
       passwordMatch = await bcrypt.compare(password, admin.password);
     }
 
     if (!passwordMatch) {
       return res.status(401).json({ message: 'Invalid credentials' });
     }
 
    
     const token = jwt.sign({ userId: user ? user._id : admin?._id, isAdmin: !!admin }, 'your_secret_key', { expiresIn: '1h' });
 
     
     if (admin) {
       res.redirect('http://127.0.0.1:5502/Admin-Dashboard/Other-Pages/Dashboard.html');
     } else {
       res.redirect('http://127.0.0.1:5502/Home.html');
     }
  } catch (error) {
     res.status(500).json({ message: 'Login failed', error });
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
