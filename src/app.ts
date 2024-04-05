// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.json'; 
import adminRoutes from './routes/adminRoutes';
import messageRoutes from './routes/messageRoutes';
import blogRoutes from './routes/blogRoutes';

const app = express();


app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/My-Brand-Backend');

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// User routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/message', messageRoutes);
app.use(blogRoutes);


// Define route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my Brand Gabriel!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
