const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());  // Apply CORS to all routes

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files
app.use('/api/users', userRoutes);

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
