# Portfolio Backend

Backend API built with Node.js, Express, and MongoDB.

## Features

- RESTful API for portfolio data
- MongoDB Atlas integration
- Cloudinary for image storage
- Authentication with JWT
- Self-ping mechanism to prevent sleep on Render

## Self-Ping Mechanism

The application includes a self-ping feature that makes an HTTP request to itself every 10 minutes to prevent the server from sleeping on Render's free tier. This is implemented in `server.js`.

### Configuration

To use this feature in production:

1. Set the `APP_URL` environment variable in your Render dashboard or in the `.env` file to your application's URL (e.g., `https://your-app-name.onrender.com`).
2. The server will automatically ping itself every 10 minutes.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Run the server: `npm start`

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `SECRET_KEY`: JWT secret key
- `APP_URL`: Your application URL on Render
- `CLOUDINARY_*`: Cloudinary configuration
