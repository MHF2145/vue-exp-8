<template>
  <div id="main-layout" class="flex flex-col min-h-screen bg-gray-100 bg-line">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Home Button -->
        <button 
          @click="goHome" 
          class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
          <img class="logo-img" src="../assets/logo.png" alt="">
        </button>
        <!-- Navigation Links -->
        <div class="flex space-x-4">
          <router-link
            to="/login"
            class="text-blue-500 hover:text-blue-700 transition duration-200"
            v-if="!isAuthenticated"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="text-blue-500 hover:text-blue-700 transition duration-200"
            v-if="!isAuthenticated"
          >
            Register
          </router-link>
          <!-- Trainer Button -->
          <button
            @click="showTrainer"
            class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 transition duration-200 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Trainer
          </button>
          <!-- Logout Button -->
          <button
            @click="confirmLogout"
            class="px-4 py-2 text-white bg-red-500 hover:bg-red-700 transition duration-200 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            v-if="isAuthenticated"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  
    <!-- Main Content Area -->
    <div class="flex flex-col items-center justify-center flex-grow relative bg-main-content">
      <!-- Welcome Section -->
      <div v-if="!isTrainerPage" class="welcome-section text-center p-8">
        <h1 class="text-4xl font-bold mb-4">Welcome to the Pokémon Pokedex</h1>
        <p class="text-lg mb-6">Select a generation to explore the Pokémon from that generation.</p>
        <GenButton @click="toggleBox" class="z-10" />
      </div>
      
      <!-- Pokémon content -->
      <div v-if="showBoxContent && !isTrainerPage" class="pokemon-content z-10 p-8">
        <h2 class="text-2xl font-bold mb-4">Pokémon Details</h2>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search Pokémon..." 
          class="mb-4 p-2 border border-gray-300 rounded"
        />
        <div class="pokemon-details" v-for="pokemon in filteredPokemons" :key="pokemon.id">
          <div class="pokemon-card bg-white shadow-lg rounded-lg p-4 flex items-center">
            <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image">
            <div class="pokemon-info ml-4">
              <p class="text-xl font-bold">{{ pokemon.name }}</p>
              <p><strong>Type:</strong> {{ pokemon.type }}</p>
              <p><strong>Abilities:</strong> {{ pokemon.abilities }}</p>
              <p><strong>Height:</strong> {{ pokemon.height }} m</p>
              <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
              <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Trainer Profile -->
      <TrainerProfile v-if="isTrainerPage" />
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import GenButton from './GenButton.vue';
import TrainerProfile from './TrainerProfile.vue';

export default {
  name: 'MainLayout',
  components: {
    GenButton,
    TrainerProfile,
  },
  data() {
    return {
      isTrainerPage: false,
      showBox: false,
      showBoxContent: false,
      searchQuery: '',
      pokemons: [
        {
          id: 1,
          name: 'Bulbasaur',
          type: 'Grass/Poison',
          abilities: 'Overgrow, Chlorophyll',
          height: 0.7,
          weight: 6.9,
          base_experience: 64,
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        },
        {
          id: 2,
          name: 'Charmander',
          type: 'Fire',
          abilities: 'Blaze, Solar Power',
          height: 0.6,
          weight: 8.5,
          base_experience: 62,
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
        },
        {
          id: 3,
          name: 'Squirtle',
          type: 'Water',
          abilities: 'Torrent, Rain Dish',
          height: 0.5,
          weight: 9.0,
          base_experience: 63,
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
        }
        // Add more Pokémon data as needed
      ]
    };
  },
  computed: {
    // Check if the user is authenticated by checking if the token exists in localStorage
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },
    filteredPokemons() {
      return this.pokemons.filter(pokemon => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
          pokemon.name.toLowerCase().includes(searchLower) ||
          pokemon.type.toLowerCase().includes(searchLower) ||
          pokemon.abilities.toLowerCase().includes(searchLower)
        );
      });
    }
  },
  methods: {
    goHome() {
      this.isTrainerPage = false;
      this.$router.push('/dashboard'); // Navigate to the landing page
    },
    showTrainer() {
      this.isTrainerPage = true; // Show the trainer profile
    },
    confirmLogout() {
      Swal.fire({
        title: 'Logging Out',
        text: 'Do you really want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('token');
      // Redirect to the home page after logout
      this.$router.push('/');
    },
    toggleBox() {
      this.showBox = !this.showBox;
      if (this.showBox) {
        this.showBoxContent = true;
      } else {
        this.showBoxContent = false;
      }
    }
  }
};
</script>

<style scoped>
.logo-img {
  width: 100px; 
  height: auto; 
}

.bg-line {
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 19px,
      rgba(255, 255, 255, 0.5) 20px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 19px,
      rgba(255, 255, 255, 0.5) 20px
    ),
    linear-gradient(to right, #4299e1, #9f7aea);
  background-size: 50% 100%, 50% 100%, 100% 100%;
  background-position: left, right, center;
  background-repeat: no-repeat;
}

.bg-main-content {
  background: linear-gradient(to right, #f8fafc, #e2e8f0);
}

.welcome-section {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-content {
  text-align: center;
  overflow-y: auto;
  max-height: 100%;
}

.pokemon-details {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.pokemon-card {
  width: 100%;
  max-width: 400px;
  transition: transform 0.2s;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-info {
  text-align: left;
}
</style>