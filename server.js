// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const https = require('https');
const http = require('http');
require('dotenv').config(); // Load environment variables
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

// Add a status route to check ping statistics
let lastPingTime = null;
let pingReceiveCount = 0;

// Add a ping route to keep the server alive
app.get('/ping', (_req, res) => {
  lastPingTime = new Date();
  console.log('Ping received at:', lastPingTime.toISOString());
  res.status(200).send('PONG');
});

app.get('/ping-status', (_req, res) => {
  pingReceiveCount++;
  const status = {
    serverStartTime: new Date(Date.now() - process.uptime() * 1000).toISOString(),
    uptime: `${Math.floor(process.uptime() / 60)} minutes`,
    lastPingTime: lastPingTime ? lastPingTime.toISOString() : 'No pings yet',
    pingReceiveCount: pingReceiveCount,
    message: 'Ping mechanism is active'
  };
  res.status(200).json(status);
});

// Start server
const PORT = process.env.PORT || 5000;

// Log environment variables for debugging
console.log('Environment variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- APP_URL:', process.env.APP_URL);
console.log('- PORT:', PORT);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Set up the self-ping mechanism to prevent the app from sleeping
  const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
  let pingCount = 0; // Counter to track number of pings

  // Function to check if server is reachable on the specified port
  const checkServerReachable = () => {
    return new Promise((resolve) => {
      const testReq = http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/ping',
        method: 'GET',
      }, (res) => {
        console.log(`Server reachability test: Status ${res.statusCode}`);
        resolve(res.statusCode === 200);
      });

      testReq.on('error', (error) => {
        console.error('Server reachability test failed:', error.message);
        resolve(false);
      });

      testReq.end();
    });
  };

  // Function to ping our own server
  const pingServer = () => {
    pingCount++;

    // Check if we have an APP_URL
    if (process.env.APP_URL) {
      console.log(`Using APP_URL: ${process.env.APP_URL}`);

      // Parse the URL properly to get hostname
      try {
        const url = new URL(process.env.APP_URL);
        console.log(`Parsed URL - hostname: ${url.hostname}, protocol: ${url.protocol}`);

        const options = {
          hostname: url.hostname, // This extracts just the hostname part
          port: url.port || (url.protocol === 'https:' ? 443 : 80),
          path: '/ping',
          method: 'GET',
        };

        console.log(`Request options:`, options);

        // Use http or https based on the URL protocol
        const requester = url.protocol === 'https:' ? https : http;

        const req = requester.request(options, (res) => {
          console.log(`Self-ping #${pingCount} performed at: ${new Date().toISOString()}, Status: ${res.statusCode}`);
        });

        req.on('error', (error) => {
          console.error('Error during self-ping:', error.message);
        });

        req.end();
      } catch (error) {
        console.error('Invalid APP_URL:', error.message);
      }
    } else {
      // For local development, use simple localhost
      const options = {
        hostname: 'localhost',
        port: PORT,
        path: '/ping',
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        console.log(`Self-ping #${pingCount} performed at: ${new Date().toISOString()}, Status: ${res.statusCode}`);
      });

      req.on('error', (error) => {
        console.error('Error during self-ping:', error.message);
      });

      req.end();
    }
  };

  // First check if the server is ready before starting the ping mechanism
  console.log('Waiting for server to be fully ready...');

  // Wait a bit longer before starting the ping mechanism
  setTimeout(async () => {
    const isServerReady = await checkServerReachable();

    if (isServerReady) {
      console.log('Server is confirmed to be ready, starting ping mechanism');

      // Start the interval for pinging
      const interval = setInterval(pingServer, PING_INTERVAL);

      // Run an initial ping to test the functionality
      console.log('Running initial test ping...');
      setTimeout(pingServer, 2000);

      // Handle server shutdown to clear the interval
      process.on('SIGTERM', () => {
        clearInterval(interval);
        server.close(() => {
          console.log('Server shut down');
        });
      });
    } else {
      console.error('Server is not ready, ping mechanism not started');
    }
  }, 10000); // Wait 10 seconds for server to be fully initialized
});
