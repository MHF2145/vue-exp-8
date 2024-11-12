<template>
  <div id="main-layout" class="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow p-4 rounded-lg mx-4 my-2">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex space-x-4">
          <button 
            @click="goHome" 
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100">
            Home
          </button>
        </div>
        <div class="flex space-x-4 justify-center flex-grow">
          <button
            @click="showItems"
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100">
            Items
          </button>
          <button
            @click="showMoves"
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100">
            Moves
          </button>
          <button
            @click="showTrainer"
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100">
            Trainer
          </button>
        </div>
        <div class="flex space-x-4">
          <router-link
            to="/login"
            class="text-blue-500 hover:text-blue-700 transition duration-200 rounded-lg px-4 py-2 hover:bg-blue-100"
            v-if="!isAuthenticated"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="text-blue-500 hover:text-blue-700 transition duration-200 rounded-lg px-4 py-2 hover:bg-blue-100"
            v-if="!isAuthenticated"
          >
            Register
          </router-link>
          <button
            @click="confirmLogout"
            class="text-white bg-red-500 hover:bg-red-700 transition duration-200 border-none cursor-pointer rounded-lg px-4 py-2 shadow-md"
            v-if="isAuthenticated"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div 
      :class="{
        'flex flex-col items-center justify-center flex-grow': !isTrainerPage, 
        'flex flex-col items-start justify-start flex-grow': isTrainerPage
      }"
      class="flex flex-col flex-grow p-4"
    >
      <div v-if="!isTrainerPage && !isItemsPage && !isMovesPage" class="welcome-section text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h1 class="text-4xl font-bold mb-4 text-blue-500">Welcome</h1>
        <p class="text-xl text-blue-500 mb-6">Explore the world of Pokémon with us!</p>
        <GenButton />
      </div>
      
      <!-- Trainer Profile Section -->
      <TrainerProfile v-if="isTrainerPage" class="w-full" />
      
      <!-- Items Section with Cards -->
      <div v-if="isItemsPage" class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div
          v-for="item in items"
          :key="item.name"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition duration-300 transform hover:scale-105"
          @click="showItemDetail(item)"
        >
          <img v-if="item.sprite" :src="item.sprite" alt="Sprite" class="w-24 h-24 mb-4" />
          <span class="text-xl font-semibold text-center">{{ item.name }}</span>
        </div>
      </div>

      <!-- Moves Section with Cards -->
      <div v-if="isMovesPage" class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div
          v-for="move in moves"
          :key="move.name"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition duration-300 transform hover:scale-105"
          @click="showMoveDetail(move)"
        >
          <span class="text-xl font-semibold text-center">{{ move.name }}</span>
        </div>
      </div>

      <!-- Pagination Buttons for Items Page -->
      <div v-if="isItemsPage" class="flex justify-between mt-4">
        <button 
          @click="fetchItems(previousPage)" 
          :disabled="!previousPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-md"
        >
          Previous
        </button>
        <button 
          @click="fetchItems(nextPage)" 
          :disabled="!nextPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-md"
        >
          Next
        </button>
      </div>

      <!-- Pagination Buttons for Moves Page -->
      <div v-if="isMovesPage" class="flex justify-between mt-4">
        <button 
          @click="fetchMoves(previousMovesPage)" 
          :disabled="!previousMovesPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-md"
        >
          Previous
        </button>
        <button 
          @click="fetchMoves(nextMovesPage)" 
          :disabled="!nextMovesPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-md"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Item Detail Popup -->
    <ItemDetailPopup
      v-if="isItemPopupVisible"
      :item="selectedItem"
      :isVisible="isItemPopupVisible"
      @close="isItemPopupVisible = false"
    />

    <!-- Move Detail Popup -->
    <MoveDetailPopup
      v-if="isMovePopupVisible"
      :move="selectedMove"
      :isVisible="isMovePopupVisible"
      @close="isMovePopupVisible = false"
    />
  </div>
</template>

<script>
import GenButton from './GenButton.vue';
import TrainerProfile from './TrainerProfile.vue';
import ItemDetailPopup from './ItemDetailPopup.vue';
import MoveDetailPopup from './MoveDetailPopup.vue';

export default {
  name: 'MainLayout',
  components: {
    GenButton,
    TrainerProfile,
    ItemDetailPopup,
    MoveDetailPopup,
  },
  data() {
    return {
      isTrainerPage: false,
      isItemsPage: false,
      isMovesPage: false,
      items: [],
      moves: [],
      nextPage: null,
      previousPage: null,
      nextMovesPage: null,
      previousMovesPage: null,
      selectedItem: null,
      selectedMove: null,
      isItemPopupVisible: false,
      isMovePopupVisible: false,
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },
  },
  methods: {
    goHome() {
      this.isTrainerPage = false;
      this.isItemsPage = false;
      this.isMovesPage = false;
      this.$router.push('/dashboard');
    },
    showTrainer() {
      this.isTrainerPage = true;
      this.isItemsPage = false;
      this.isMovesPage = false;
    },
    showItems() {
      this.isTrainerPage = false;
      this.isItemsPage = true;
      this.isMovesPage = false;
      this.fetchItems('https://pokeapi.co/api/v2/item?offset=0&limit=20');
    },
    showMoves() {
      this.isTrainerPage = false;
      this.isItemsPage = false;
      this.isMovesPage = true;
      this.fetchMoves('https://pokeapi.co/api/v2/move?offset=0&limit=20');
    },
    fetchItems(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const itemsWithSprites = data.results.map(item => {
            return fetch(item.url)
              .then(response => response.json())
              .then(itemDetail => ({
                ...item, 
                id: itemDetail.id,
                sprite: itemDetail.sprites?.default || null,
              }));
          });

          Promise.all(itemsWithSprites)
            .then(items => {
              this.items = items;
              this.nextPage = data.next;
              this.previousPage = data.previous;
            })
            .catch(error => {
              console.error('Error fetching item details:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    },
    fetchMoves(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const detailedMoves = data.results.map(move => {
            return fetch(move.url)
              .then(response => response.json())
              .then(moveDetail => ({
                ...move,
                type: moveDetail.type.name,
                power: moveDetail.power || 'N/A',
                accuracy: moveDetail.accuracy || 'N/A',
                description: this.getMoveDescription(moveDetail),
              }));
          });

          Promise.all(detailedMoves)
            .then(moves => {
              this.moves = moves;
              this.nextMovesPage = data.next;
              this.previousMovesPage = data.previous;
            })
            .catch(error => {
              console.error('Error fetching move details:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching moves:', error);
        });
    },
    getMoveDescription(moveDetail) {
      const flavorTextEntries = moveDetail.flavor_text_entries;
      if (flavorTextEntries && flavorTextEntries.length > 0) {
        const englishText = flavorTextEntries.find(entry => entry.language.name === 'en');
        return englishText ? englishText.flavor_text : 'No description available';
      }
      return 'No description available';
    },
    showItemDetail(item) {
      this.selectedItem = item;
      this.isItemPopupVisible = true;
    },
    showMoveDetail(move) {
      this.selectedMove = move;
      this.isMovePopupVisible = true;
    },
    confirmLogout() {
      if (confirm('Are you sure you want to log out?')) {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
#main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #4299e1, #9f7aea);
}

nav {
  border-radius: 10px;
}

button {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-2px);
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: scale(1.05);
}

.text-white {
  color: white;
}

.welcome-section {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.75);
}
</style>