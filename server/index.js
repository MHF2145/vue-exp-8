require('dotenv').config();
const express = require('express');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const favoritePokemonController = require('./controllers/favoritePokemonController');
const favoriteItemController = require('./controllers/favoriteItemController');
const favoriteMoveController = require('./controllers/favoriteMoveController');
const favoriteGymController = require('./controllers/favoriteGymController');
const favoriteTrainerController = require('./controllers/favoriteTrainerController'); // Tambahkan ini
const authMiddleware = require('./middlewares/authMiddleware');
const knex = require('knex')(require('./knexfile').development);
const cors = require('cors');

const app = express();

// Setup CORS middleware
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.post('/register', registerController.register);
app.post('/login', loginController.login);

// Routes untuk mendapatkan daftar semua pengguna
app.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await knex('users').select('id', 'username'); // Ganti 'username' dengan kolom yang sesuai
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});


// Routes untuk mengelola Pokémon favorit
app.post('/favorite-pokemons', authMiddleware, favoritePokemonController.addFavoritePokemon);
app.get('/favorite-pokemons', authMiddleware, favoritePokemonController.getFavoritePokemons);
app.delete('/favorite-pokemons/:pokemonId', authMiddleware, favoritePokemonController.removeFavoritePokemon);

// Routes untuk mengelola item favorit
app.post('/favorite-items', authMiddleware, favoriteItemController.addFavoriteItem);
app.get('/favorite-items', authMiddleware, favoriteItemController.getFavoriteItems);
app.delete('/favorite-items/:itemId', authMiddleware, favoriteItemController.removeFavoriteItem);

// Routes untuk mengelola move favorit
app.post('/favorite-moves', authMiddleware, favoriteMoveController.addFavoriteMove);
app.get('/favorite-moves', authMiddleware, favoriteMoveController.getFavoriteMoves);
app.delete('/favorite-moves/:moveId', authMiddleware, favoriteMoveController.removeFavoriteMove);

// Routes untuk mengelola gym favorit
app.post('/favorite-gyms', authMiddleware, favoriteGymController.addFavoriteGym);
app.get('/favorite-gyms', authMiddleware, favoriteGymController.getFavoriteGyms);
app.put('/favorite-gyms/:gymId', authMiddleware, favoriteGymController.updateFavoriteGym);
app.delete('/favorite-gyms/:gymId', authMiddleware, favoriteGymController.removeFavoriteGym);

// Routes untuk mengelola trainer favorit
app.post('/favorite-trainers', authMiddleware, favoriteTrainerController.addFavoriteTrainer);  // Tambah trainer favorit
app.get('/favorite-trainers', authMiddleware, favoriteTrainerController.getFavoriteTrainers);  // Ambil trainer favorit
app.put('/favorite-trainers/:trainerId', authMiddleware, favoriteTrainerController.updateFavoriteTrainer);  // Update trainer favorit
app.delete('/favorite-trainers/:trainerId', authMiddleware, favoriteTrainerController.removeFavoriteTrainer);  // Hapus trainer favorit

// Mulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
