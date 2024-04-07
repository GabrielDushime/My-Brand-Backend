import express from 'express';
import { userSignup, userSignin, deleteUser, updateUser, getAllUsers } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/signup', userSignup);
userRoutes.post('/signin', userSignin);
userRoutes.delete('/:userId', deleteUser);
userRoutes.put('/:userId', updateUser);
userRoutes.get('/', getAllUsers);

export default userRoutes;
