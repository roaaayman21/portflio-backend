// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDb = require('./config/db');

// Import routes
const aboutRoutes = require('./routes/aboutRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDb();  // This assumes connectDb is set up to handle your MongoDB connection

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (like images) from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define API routes
app.use('/api', aboutRoutes);
app.use('/api', skillRoutes);
app.use('/api', projectRoutes);
app.use('/user', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
