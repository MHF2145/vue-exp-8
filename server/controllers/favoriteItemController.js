const knex = require('knex')(require('../knexfile').development);
const axios = require('axios');

exports.addFavoriteItem = async (req, res) => {
  const { itemId, itemName, itemCategory } = req.body;
  const userId = req.user.id; 

  try {
    // Cek jika item sudah ada di daftar favorit
    const existingFavorite = await knex('top_items')
      .where({ user_id: userId, item_id: itemId })
      .first();
    if (existingFavorite) {
      return res.status(400).json({ message: 'Item already in favorites' });
    }

    // Menambahkan item ke daftar favorit
    await knex('top_items').insert({
      user_id: userId,
      item_id: itemId,
      item_name: itemName,
      item_category: itemCategory, 
    });

    res.json({ message: 'Item added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to favorites', error: err.message });
  }
};

// Fetch favorite items
exports.getFavoriteItems = async (req, res) => {
  const userId = req.user.id;

  try {
    // Ambil item favorit dari database
    const favorites = await knex('top_items')
      .where('user_id', userId)
      .select('item_id', 'item_name', 'item_category');

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorite items found' });
    }

    // Fetch sprite for each item
    const favoritesWithSprites = await Promise.all(favorites.map(async (favorite) => {
      try {
        // Fetch data dari PokeAPI untuk mendapatkan sprite
        const response = await axios.get(`https://pokeapi.co/api/v2/item/${favorite.item_name.toLowerCase()}`);
        const spriteUrl = response.data.sprites.default; // Menyimpan sprite URL

        return {
          ...favorite,
          sprite_url: spriteUrl, // Menambahkan sprite URL ke item favorit
        };
      } catch (error) {
        console.error(`Error fetching sprite for item ${favorite.item_name}:`, error);
        return {
          ...favorite,
          sprite_url: null, // Jika gagal mengambil sprite, gunakan null
        };
      }
    }));

    res.json({ items: favoritesWithSprites });
  } catch (err) {
    console.error('Error fetching favorite items:', err);
    res.status(500).json({ message: 'Error fetching favorite items', error: err.message });
  }
};


exports.removeFavoriteItem = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;     

  try {
    // Cek jika item tersebut ada dalam daftar favorit pengguna
    const favorite = await knex('top_items')
      .where({ user_id: userId, item_id: itemId })
      .first();
    
    if (!favorite) {
      return res.status(404).json({ message: 'Item not found in your favorites' });
    }

    // Menghapus item dari daftar favorit
    await knex('top_items')
      .where({ user_id: userId, item_id: itemId })
      .del();

    res.json({ message: 'Item removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from favorites', error: err.message });
  }
};
