<template>
  <div id="main-layout" class="flex flex-col min-h-screen bg-gray-100">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex space-x-4">
          <button 
            @click="goHome" 
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
            Home
          </button>
          <button
            @click="showItems"
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
            Items
          </button>
          <button
            @click="showMoves"
            class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
            Moves
          </button>
        </div>
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
          <button
            @click="showTrainer"
            class="text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
            Trainer
          </button>
          <button
            @click="logout"
            class="text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer"
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
      class="flex flex-col flex-grow"
    >
      <h1 class="text-4xl font-bold mb-6" v-if="!isTrainerPage && !isItemsPage && !isMovesPage">Welcome</h1>
      <GenButton v-if="!isTrainerPage && !isItemsPage && !isMovesPage" />
      <!-- TrainerProfile should occupy full width -->
      <TrainerProfile v-if="isTrainerPage" class="w-full" />
      
      <!-- Items Section with Cards -->
      <div v-if="isItemsPage" class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div
          v-for="item in items"
          :key="item.name"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition duration-300"
          @click="showItemDetail(item)"
        >
          <!-- Menampilkan sprite jika ada -->
          <img v-if="item.sprite" :src="item.sprite" alt="Sprite" class="w-24 h-24 mb-4" />
          <span class="text-xl font-semibold text-center">{{ item.name }}</span>
        </div>
      </div>

      <!-- Moves Section with Cards -->
      <div v-if="isMovesPage" class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div
          v-for="move in moves"
          :key="move.name"
          class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition duration-300"
          @click="showMoveDetail(move)"
        >
          <span class="text-xl font-semibold text-center">{{ move.name }}</span>
        </div>
      </div>

      <!-- Pagination Buttons (Only Show on Items Page) -->
      <div v-if="isItemsPage" class="flex justify-between mt-4">
        <button 
          @click="fetchItems(previousPage)" 
          :disabled="!previousPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          @click="fetchItems(nextPage)" 
          :disabled="!nextPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <!-- Pagination Buttons (Only Show on Moves Page) -->
      <div v-if="isMovesPage" class="flex justify-between mt-4">
        <button 
          @click="fetchMoves(previousMovesPage)" 
          :disabled="!previousMovesPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          @click="fetchMoves(nextMovesPage)" 
          :disabled="!nextMovesPage" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
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
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Ensure layout takes full width */
#main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main-layout .flex-grow {
  flex-grow: 1;
}

#main-layout .container {
  max-width: 100%;
}

.TrainerProfile {
  width: 100%; /* Full width */
}
</style>
