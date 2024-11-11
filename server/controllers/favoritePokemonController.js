const knex = require('knex')(require('../knexfile').development);
const axios = require('axios');

exports.addFavoritePokemon = async (req, res) => {
  const { pokemonId } = req.body;
  const userId = req.user.id; 

  try {
    // Cek jika Pokémon sudah ada di daftar favorit
    const existingFavorite = await knex('favorite_pokemons')
      .where({ user_id: userId, pokemon_id: pokemonId })
      .first();
    if (existingFavorite) {
      return res.status(400).json({ message: 'Pokémon already in favorites' });
    }

    // Menambahkan Pokémon favorit
    await knex('favorite_pokemons').insert({
      user_id: userId,
      pokemon_id: pokemonId,
    });

    res.json({ message: 'Pokémon added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to favorites', error: err.message });
  }
};

exports.getFavoritePokemons = async (req, res) => {
  const userId = req.user.id; 

  try {
    // Ambil daftar pokemon_id dari tabel favorite_pokemons berdasarkan user_id
    const favorites = await knex('favorite_pokemons')
      .where('user_id', userId)
      .select('pokemon_id'); 

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorite Pokémon found' });
    }

    // Ambil data Pokémon dari PokeAPI untuk setiap pokemon_id
    const pokemonRequests = favorites.map(favorite => {
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${favorite.pokemon_id}`)
        .then(response => {
          return {
            id: favorite.pokemon_id,
            name: response.data.name,
            image: response.data.sprites.front_default,
          };
        })
        .catch(error => {
          console.error(`Error fetching Pokémon with ID ${favorite.pokemon_id}:`, error);
          return null;
        });
    });

    // Tunggu hingga semua request selesai
    const pokemons = await Promise.all(pokemonRequests);

    // Filter untuk menghapus hasil null (Pokémon yang gagal diambil)
    const validPokemons = pokemons.filter(pokemon => pokemon !== null);

    // Kirim response dengan data Pokémon favorit
    res.json({ pokemons: validPokemons });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorite Pokémon', error: err.message });
  }
};

exports.removeFavoritePokemon = async (req, res) => {
  const { pokemonId } = req.params;  
  const userId = req.user.id;        

  try {
    // Cek jika Pokémon tersebut ada dalam daftar favorit pengguna
    const favorite = await knex('favorite_pokemons')
      .where({ user_id: userId, pokemon_id: pokemonId })
      .first();
    
    if (!favorite) {
      return res.status(404).json({ message: 'Pokémon not found in your favorites' });
    }

    // Menghapus Pokémon dari daftar favorit
    await knex('favorite_pokemons')
      .where({ user_id: userId, pokemon_id: pokemonId })
      .del();

    res.json({ message: 'Pokémon removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing Pokémon from favorites', error: err.message });
  }
};
