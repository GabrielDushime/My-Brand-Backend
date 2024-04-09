import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.json'; 
import adminRoutes from './routes/adminRoutes';
import messageRoutes from './routes/messageRoutes';
import blogRoutes from './routes/blogRoutes';
import { getAllComments } from './controllers/blogController';
import { createMasterAdmin } from './controllers/adminController'; // Import the createMasterAdmin function
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

// Database connection
mongoose.connect(process.env.database_connection as string);

const db = mongoose.connection;

db.once('open', async () => { // Call createMasterAdmin once the database connection is open
  console.log('Connected to MongoDB');
  await createMasterAdmin(); // Call the function here
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/blog', blogRoutes);
app.get('/api/comments', getAllComments);
// Define route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my Brand Gabriel!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
