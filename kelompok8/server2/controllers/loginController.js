// server/controllers/loginController.js

const knex = require('knex')(require('../../server/knexfile').development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Login an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await knex('users').where({ username }).first();
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
