const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS module
const aboutRoutes = require('./routes/aboutRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio');
    
// Middleware to parse JSON
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api', aboutRoutes);
app.use('/api', skillRoutes);
app.use('/api', projectRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
