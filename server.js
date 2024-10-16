const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aboutRoutes = require('./routes/aboutRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const connectDb = require('./config/db');

const app = express();
connectDb();
// Enable CORS
app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/portfolio');
    
// Middleware to parse JSON
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', aboutRoutes);
app.use('/api', skillRoutes);
app.use('/api', projectRoutes);
app.use('/user', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
