import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.json'; 

import messageRoutes from './routes/messageRoutes';
import blogRoutes from './routes/blogRoutes';
import { getAllComments } from './controllers/blogController';

import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addAdminCredentials } from './setupAdminCredentials';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.database_connection as string);

const db = mongoose.connection;

db.once('open', async () => { 
 console.log('Connected to MongoDB');
 await addAdminCredentials(); 
});

db.on('error', (err) => {
 console.error('MongoDB connection error:', err);
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/user', userRoutes);
app.options('/api/message');
app.use('/api/message', messageRoutes);
app.use('/api/blog', blogRoutes);
app.get('/api/comments', getAllComments);

app.get('/', (req, res) => {
 res.send('Welcome to my Brand Gabriel!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

export default app;
