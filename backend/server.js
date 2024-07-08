import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectMongo.js';
import authRoutes from './routes/authRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

// Initialize dotenv for environment variables
dotenv.config(); 

// Create an instance of the Express application
const app = express();  // Initialize app before configuring middleware

// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:3001',  // Frontend URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true  // Allow cookies and other credentials
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use('/', authRoutes);
app.use('/message', messageRoutes);
app.use('/users', userRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
