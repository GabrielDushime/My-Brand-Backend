// src/routes/userRoutes.ts
import express from 'express';
import { userSignup, userSignin, deleteUser, updateUser, getAllUsers } from '../controllers/userController';

const userRoutes= express.Router();

userRoutes.post('/api/user/signup', userSignup);
userRoutes.post('/api/user/signin', userSignin);
userRoutes.delete('/api/user/:userId', deleteUser);
userRoutes.put('/api/user/:userId', updateUser);
userRoutes.get('/api/users', getAllUsers);

export default userRoutes;
