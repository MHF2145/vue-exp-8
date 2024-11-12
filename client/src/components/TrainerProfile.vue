<template>
  <div class="p-4 min-h-screen flex flex-col bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center text-yellow-600">Trainer Profile</h2>

    <!-- Favorite Pokémon Section -->
    <h3 class="text-2xl font-semibold mb-4 mt-6 text-red-600">Favorite Pokémon</h3>
    <div v-if="favoritePokemons.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="pokemon in favoritePokemons" :key="pokemon.id" class="pokemon-card bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300">
        <img :src="pokemon.image" :alt="pokemon.name" class="w-16 h-16 object-cover mx-auto mb-2">
        <h4 class="text-center text-xl text-blue-600">{{ pokemon.name }}</h4>
        <button @click="removeFavoritePokemon(pokemon.id)" class="mt-2 bg-red-500 text-white rounded px-4 py-1">
          Remove
        </button>
      </div>
    </div>
    <p v-else class="text-left text-gray-600">No favorite Pokémon found</p>

    <!-- Favorite Moves Section -->
    <h3 class="text-2xl font-semibold mb-4 mt-6 text-red-600">Favorite Moves</h3>
    <div v-if="favoriteMoves.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="move in favoriteMoves" :key="move.move_id" class="move-card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 flex flex-col items-center justify-between">
        <h4 class="text-xl font-semibold text-center text-blue-600">{{ move.move_name }}</h4>
        <p class="text-center text-gray-700">Type: {{ move.move_type }}</p>
        <p class="text-center text-gray-700">Power: {{ move.power }}</p>
        <p class="text-center text-gray-700">Accuracy: {{ move.accuracy }}</p>
        <p class="text-center text-gray-700">PP: {{ move.pp }}</p>
        <!-- Remove button for each move -->
        <button @click="removeFavoriteMove(move.move_id)" class="mt-4 bg-red-500 text-white rounded px-4 py-1 self-center">
          Remove
        </button>
      </div>
    </div>
    <p v-else class="text-left text-gray-600">No favorite moves found</p>

    <!-- Favorite Items Section -->
    <h3 class="text-2xl font-semibold mb-4 mt-6 text-red-600">Favorite Items</h3>
    <div v-if="favoriteItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="item in favoriteItems" :key="item.item_id" class="item-card bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300">
        <img v-if="item.sprite" :src="item.sprite" alt="Item Sprite" class="w-16 h-16 object-cover mx-auto mb-2">
        <h4 class="text-center text-xl text-blue-600">{{ item.item_name }}</h4>
        <p class="text-center text-gray-700">{{ item.item_category }}</p>
        <button @click="removeFavoriteItem(item.item_id)" class="mt-2 bg-red-500 text-white rounded px-4 py-1">
          Remove
        </button>
      </div>
    </div>
    <p v-else class="text-left text-gray-600">No favorite items found</p>

    <!-- Favorite Gyms Section as Cards -->
    <h3 class="text-2xl font-semibold mb-4 mt-8 text-red-600">Favorite Gyms</h3>
    <button @click="showGymPopup = true" class="add-button mb-4">
      Add Favorite Gym
    </button>

    <div v-if="favoriteGyms.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="gym in favoriteGyms" 
        :key="gym.id" 
        class="gym-card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 flex flex-col items-center justify-between"
      >
        <h4 class="text-xl font-semibold text-center text-blue-600">{{ gym.gym_name }}</h4>
        <p class="text-center text-gray-700">Leader: {{ gym.gym_leader }}</p>
        <p class="text-center text-gray-700">Region: {{ gym.region }}</p>
        <button @click="removeFavoriteGym(gym.id)" class="mt-2 bg-red-500 text-white rounded px-4 py-1 self-center">
          Remove
        </button>
      </div>
    </div>
    <p v-else class="text-left text-gray-600">No favorite gyms found</p>

    <!-- Favorite Trainers Section -->
    <h3 class="text-2xl font-semibold mb-4 mt-8 text-red-600">Favorite Trainers</h3>
    <button @click="showTrainerPopup = true" class="add-button mb-4">
      Add Favorite Trainer
    </button>

    <div v-if="favoriteTrainers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="trainer in favoriteTrainers" 
        :key="trainer.id" 
        class="trainer-card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 flex flex-col justify-center items-center"
      >
        <h4 class="text-xl font-semibold text-center text-blue-600">{{ trainer.username }}</h4>
        <p class="text-center text-gray-700">Trainer ID: {{ trainer.id }}</p>
        <!-- Remove button -->
        <button @click="removeFavoriteTrainer(trainer.id)" class="mt-4 bg-red-500 text-white rounded px-4 py-1 self-center">
          Remove
        </button>
      </div>
    </div>

    <p v-else class="text-left text-gray-600">No favorite trainers found</p>

    <!-- AddFavoriteTrainer Popup Component -->
    <AddFavoriteTrainer 
      v-if="showTrainerPopup" 
      :isVisible="showTrainerPopup" 
      @close="showTrainerPopup = false" 
      @trainerAdded="fetchFavoriteTrainers"
    />

    <!-- AddFavoriteGym Popup Component -->
    <AddFavoriteGym 
      v-if="showGymPopup" 
      :isVisible="showGymPopup" 
      @close="showGymPopup = false" 
      @gymAdded="fetchFavoriteGyms"
    />
  </div>
</template>

<script>
import AddFavoriteGym from './AddFavoriteGym.vue';
import AddFavoriteTrainer from './AddFavoriteTrainer.vue';

export default {
  name: 'TrainerProfile',
  components: {
    AddFavoriteGym,
    AddFavoriteTrainer
  },
  data() {
    return {
      username: '',
      favoritePokemons: [],  // Store favorite Pokémon
      favoriteItems: [],     // Store favorite items
      favoriteGyms: [],      // Store favorite gyms
      favoriteTrainers: [],  // Store favorite trainers
      favoriteMoves: [],     // Store favorite moves
      showGymPopup: false,   // Show favorite gym popup
      showTrainerPopup: false, // Show favorite trainer popup
    };
  },
  created() {
    this.fetchUsername();
    this.fetchFavoritePokemons();
    this.fetchFavoriteItems();
    this.fetchFavoriteGyms();
    this.fetchFavoriteTrainers();
    this.fetchFavoriteMoves();
  },
  methods: {
    // Fetch username from database to display the username of trainer login
    fetchUsername() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.username) {
            this.username = data.username;
          }
        })
        .catch(error => {
          console.error('Error fetching username:', error);
        });
      }
    },

    // Fetch Favorite Pokemons
    fetchFavoritePokemons() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/favorite-pokemons', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.pokemons) {
            this.favoritePokemons = data.pokemons;
          }
        })
        .catch(error => {
          console.error('Error fetching favorite Pokémon:', error);
        });
      }
    },

    // Fetch Favorite Items
    fetchFavoriteItems() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/favorite-items', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.items) {
            this.favoriteItems = data.items.map(item => ({
              ...item,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item_name.toLowerCase().replace(/\s+/g, '-')}.png`,
            }));
          }
        })
        .catch(error => {
          console.error('Error fetching favorite items:', error);
        });
      }
    },

    // Fetch Favorite Gyms
    fetchFavoriteGyms() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/favorite-gyms', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.gyms) {
            this.favoriteGyms = data.gyms;
          }
        })
        .catch(error => {
          console.error('Error fetching favorite gyms:', error);
        });
      }
    },

    // Fetch Favorite Trainers
    fetchFavoriteTrainers() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/favorite-trainers', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.trainers) {
            this.favoriteTrainers = data.trainers;
          }
        })
        .catch(error => {
          console.error('Error fetching favorite trainers:', error);
        });
      }
    },

    // Fetch Favorite Moves
    fetchFavoriteMoves() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/favorite-moves', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.moves) {
            this.favoriteMoves = data.moves;
          }
        })
        .catch(error => {
          console.error('Error fetching favorite moves:', error);
        });
      }
    },

    // Method to remove a Pokémon from favorites
    removeFavoritePokemon(pokemonId) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`http://localhost:3000/favorite-pokemons/${pokemonId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Pokémon removed from favorites') {
            this.favoritePokemons = this.favoritePokemons.filter(pokemon => pokemon.id !== pokemonId);
          } else {
            console.error('Error removing Pokémon:', data.message);
          }
        })
        .catch(error => {
          console.error('Error removing Pokémon:', error);
        });
      }
    },

    // Method to remove an item from favorites
    removeFavoriteItem(itemId) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`http://localhost:3000/favorite-items/${itemId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Item removed from favorites') {
            this.favoriteItems = this.favoriteItems.filter(item => item.item_id !== itemId);
          } else {
            console.error('Error removing item:', data.message);
          }
        })
        .catch(error => {
          console.error('Error removing item:', error);
        });
      }
    },

    // Method to remove a move from favorites
    removeFavoriteMove(moveId) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`http://localhost:3000/favorite-moves/${moveId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Move removed from favorites') {
            this.favoriteMoves = this.favoriteMoves.filter(move => move.move_id !== moveId);
          } else {
            console.error('Error removing move:', data.message);
          }
        })
        .catch(error => {
          console.error('Error removing move:', error);
        });
      }
    },

    // Method to remove a gym from favorites
    removeFavoriteGym(gymId) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`http://localhost:3000/favorite-gyms/${gymId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Gym removed from favorites') {
            this.favoriteGyms = this.favoriteGyms.filter(gym => gym.id !== gymId);
          } else {
            console.error('Error removing gym:', data.message);
          }
        })
        .catch(error => {
          console.error('Error removing gym:', error);
        });
      }
    },

    // Method to remove a trainer from favorites
    removeFavoriteTrainer(trainerId) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`http://localhost:3000/favorite-trainers/${trainerId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Trainer removed from favorites') {
            this.favoriteTrainers = this.favoriteTrainers.filter(trainer => trainer.id !== trainerId);
          } else {
            console.error('Error removing trainer:', data.message);
          }
        })
        .catch(error => {
          console.error('Error removing trainer:', error);
        });
      }
    },
  },
};
</script>

<style scoped>
/* Styling for the item cards */
.pokemon-card, .item-card, .move-card, .gym-card, .trainer-card {
  transition: transform 0.2s ease-in-out;
}

.pokemon-card:hover, .item-card:hover, .move-card:hover, .gym-card:hover, .trainer-card:hover {
  transform: scale(1.05);
}

.pokemon-card, .item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-card img, .item-card img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  margin-bottom: 12px;
}

.pokemon-card h4, .item-card h4 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #1e3a8a;
}

.pokemon-card button, .item-card button {
  margin-top: 10px;
  background-color: #ff4d4d;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.pokemon-card button:hover, .item-card button:hover {
  background-color: #e04e4e;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.text-yellow-600 {
  color: #d69e2e;
}

.text-blue-600 {
  color: #3182ce;
}

.text-red-600 {
  color: #e53e3e;
}

.text-gray-600 {
  color: #718096;
}

.text-gray-700 {
  color: #4a5568;
}

/* Styling for the add buttons */
.add-button {
  background-color: #4299e1;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out;
}

.add-button:hover {
  background-color: #3182ce;
}
</style>
