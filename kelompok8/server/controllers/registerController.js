// server/controllers/registerController.js

const knex = require('knex')(require('../knexfile').development);
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

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await knex('users')
      .where({ username })
      .orWhere({ email })
      .first();
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert new user
    const [userId] = await knex('users').insert({
      username,
      email,
      password_hash: passwordHash,
    });

    // Generate JWT token
    const token = generateToken({ id: userId, username });
    res.json({ token, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};
