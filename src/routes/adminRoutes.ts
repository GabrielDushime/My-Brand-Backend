import express from 'express';
import { adminSignup, adminSignin, updateAdmin, deleteAdmin, getAllAdmins } from '../controllers/adminController';

const adminRoutes = express.Router();


adminRoutes.post('/api/admin/signup', adminSignup);
adminRoutes.post('/api/admin/signin', adminSignin);
adminRoutes.put('/api/admin/:adminId', updateAdmin);
adminRoutes.delete('/api/admin/:adminId', deleteAdmin);
adminRoutes.get('/api/admins', getAllAdmins);

export default adminRoutes;
