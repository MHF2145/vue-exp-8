require('dotenv').config();
const express = require('express');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('./knexfile').development);
const cors = require('cors'); // Import CORS

const app = express();

// Setup CORS middleware
const corsOptions = {
  origin: 'http://localhost:8080',  // Ganti dengan URL frontend Anda (misalnya http://localhost:8080)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Gunakan middleware CORS
app.use(cors(corsOptions));  // CORS diaktifkan dengan konfigurasi ini

app.use(express.json());

// Routes
app.post('/register', registerController.register);
app.post('/login', loginController.login);

// Middleware untuk route yang membutuhkan token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']; // Ambil token dari header authorization
  if (!token) return res.status(401).send({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Contoh protected route
app.get('/profile', authenticateToken, async (req, res) => {
  const user = await knex('users').where({ id: req.user.id }).first();
  res.json({ user });
});

// Mulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
