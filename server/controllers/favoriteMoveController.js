const knex = require('knex')(require('../knexfile').development);
const axios = require('axios');

exports.addFavoriteMove = async (req, res) => {
  const { moveId, moveName, moveType } = req.body;
  const userId = req.user.id; 

  // Debugging: Log input yang diterima oleh backend
  // console.log('Received moveId:', moveId, 'moveName:', moveName, 'moveType:', moveType, 'userId:', userId);

  if (!moveId || !moveName || !moveType) {
    return res.status(400).json({ message: 'Missing required data' });
  }

  try {
    // Cek jika move sudah ada di daftar favorit
    const existingFavorite = await knex('top_moves')
      .where({ user_id: userId, move_id: moveId })
      .first();

    // Debugging: Log apakah move sudah ada di favorit
    // console.log('Existing Favorite:', existingFavorite);

    if (existingFavorite) {
      return res.status(400).json({ message: 'Move already in favorites' });
    }

    // Menambahkan move ke daftar favorit
    await knex('top_moves').insert({
      user_id: userId,
      move_id: moveId,
      move_name: moveName,
      move_type: moveType,
    });

    res.json({ message: 'Move added to favorites' });
  } catch (err) {
    // Debugging: Log error yang terjadi
    // console.error('Error adding to favorites:', err);
    res.status(500).json({ message: 'Error adding to favorites', error: err.message });
  }
};


// Fetch favorite moves
exports.getFavoriteMoves = async (req, res) => {
  const userId = req.user.id;

  try {
    // Ambil move favorit dari database
    const favorites = await knex('top_moves')
      .where('user_id', userId)
      .select('move_id', 'move_name', 'move_type');

    // Debugging: Log daftar favorit
    // console.log('Favorites:', favorites);

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorite moves found' });
    }

    // Fetch details for each move
    const favoritesWithDetails = await Promise.all(favorites.map(async (favorite) => {
      try {
        // Fetch data dari PokeAPI untuk mendapatkan detail move
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${favorite.move_name.toLowerCase()}`);
        const moveDetails = response.data; // Menyimpan detail move

        return {
          ...favorite,
          power: moveDetails.power || 'N/A',
          accuracy: moveDetails.accuracy || 'N/A',
          pp: moveDetails.pp || 'N/A',
        };
      } catch (error) {
        console.error(`Error fetching details for move ${favorite.move_name}:`, error);
        return {
          ...favorite,
          power: 'N/A',
          accuracy: 'N/A',
          pp: 'N/A',
        };
      }
    }));

    res.json({ moves: favoritesWithDetails });
  } catch (err) {
    console.error('Error fetching favorite moves:', err);
    res.status(500).json({ message: 'Error fetching favorite moves', error: err.message });
  }
};

exports.removeFavoriteMove = async (req, res) => {
  const { moveId } = req.params; // Mengambil moveId dari parameter URL
  const userId = req.user.id;     // Mengambil userId dari token JWT yang terverifikasi

  try {
    // Cek jika move tersebut ada dalam daftar favorit pengguna
    const favorite = await knex('top_moves')
      .where({ user_id: userId, move_id: moveId })
      .first();

    // Debugging: Log apakah favorit ditemukan
    // console.log('Favorite to remove:', favorite);

    if (!favorite) {
      return res.status(404).json({ message: 'Move not found in your favorites' });
    }

    // Menghapus move dari daftar favorit
    await knex('top_moves')
      .where({ user_id: userId, move_id: moveId })
      .del();

    res.json({ message: 'Move removed from favorites' });
  } catch (err) {
    // Debugging: Log error yang terjadi
    // console.error('Error removing from favorites:', err);
    res.status(500).json({ message: 'Error removing move from favorites', error: err.message });
  }
};
