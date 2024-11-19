import express from 'express';
import dotenv from 'dotenv';
import getUser from './controller/getUser.js';  // Import the getUser router

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // Use middleware to handle JSON requests

// Use the getUser routes
app.use(getUser);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
