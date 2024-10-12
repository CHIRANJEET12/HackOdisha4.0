import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Use CORS middleware to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Specify the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified methods
  credentials: true, // Allow credentials if needed
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to Atlas MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
