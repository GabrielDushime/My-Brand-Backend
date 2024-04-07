import express from 'express';
import { adminSignup, adminSignin, updateAdmin, deleteAdmin, getAllAdmins } from '../controllers/adminController';

const adminRoutes = express.Router();

adminRoutes.post('/signup', adminSignup);
adminRoutes.post('/signin', adminSignin);
adminRoutes.put('/:adminId', updateAdmin);
adminRoutes.delete('/:adminId', deleteAdmin);
adminRoutes.get('/', getAllAdmins);

export default adminRoutes;
