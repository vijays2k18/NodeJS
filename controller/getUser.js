import express from 'express';
import User from '../models/user.js';  // Import the User model

const getUser = express.Router();

// GET all users with optional limit
getUser.get('/api/users', async (req, res) => {
  try {
    // Extract the limit query parameter from the request (default to 10 if not provided)
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 users if no limit is provided

    // Fetch all users using Sequelize, with the optional limit
    const users = await User.findAll({
      limit: limit,  // Apply the limit to the query
    });

    res.status(200).json(users);  // Send the result as a response
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a single user by ID
getUser.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);  // Send the result as a response
  } catch (err) {
    console.error('Error fetching user by ID:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST create a new user
getUser.post('/api/users', async (req, res) => {
  try {
    const { name, age, city } = req.body;  // Destructure data from request body

    // Check if all fields are provided
    if (!name || !age || !city) {
      return res.status(400).json({ message: 'All fields (name, age, city) are required' });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      age,
      city,
    });

    res.status(201).json(newUser);  // Return the created user as a response
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT update an existing user by ID
getUser.put('/api/users/:id', async (req, res) => {
  try {
    const { name, age, city } = req.body;  // Destructure data from request body

    // Check if the user exists
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user
    const updatedUser = await user.update({
      name: name || user.name,  // If no name provided, keep the current name
      age: age || user.age,  // If no age provided, keep the current age
      city: city || user.city,  // If no city provided, keep the current city
    });

    res.status(200).json(updatedUser);  // Return the updated user as a response
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a user by ID
getUser.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });  // Return success message
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default getUser;
