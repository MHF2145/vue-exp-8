<template>
    <div class="flex flex-col items-center">
      <div class="mt-4">
        <select
          v-model="selectedGeneration"
          @change="fetchPokemon(selectedGeneration)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          <option disabled value="">Select Generation</option>
          <option v-for="i in 9" :key="i" :value="i">
            Gen {{ i }}
          </option>
        </select>
      </div>
  
      <div
        v-if="selectedGeneration"
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-6 w-full px-4"
      >
        <div
          v-for="pokemon in paginatedPokemon"
          :key="pokemon.id"
          class="bg-white rounded shadow p-2 flex flex-col items-center justify-center"
        >
          <img 
            :src="pokemon.sprite" 
            :alt="pokemon.name" 
            class="w-full h-auto object-contain mb-2"
          />
          <h2 class="text-lg font-semibold truncate">{{ pokemon.name }}</h2>
        </div>
      </div>
  
      <div v-if="selectedGeneration" class="flex space-x-4 mt-4">
        <button
          v-if="currentPage > 1"
          @click="prevPage"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Previous
        </button>
        <button
          v-if="currentPage < totalPages"
          @click="nextPage"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pokemonList: [],
        selectedGeneration: null,
        currentPage: 1,
        itemsPerPage: 24
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.pokemonList.length / this.itemsPerPage);
      },
      paginatedPokemon() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.pokemonList.slice(start, end);
      }
    },
    methods: {
      async fetchPokemon(gen) {
        this.pokemonList = [];
        this.currentPage = 1; // Reset to the first page when a new generation is selected
  
        if (gen == 1) {
          for (let id = 1; id <= 151; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 2) {
          for (let id = 152; id <= 251; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 3) {
          for (let id = 252; id <= 386; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 4) {
          for (let id = 387; id <= 494; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 5) {
          for (let id = 495; id <= 649; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 6) {
          for (let id = 650; id <= 722; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 7) {
          for (let id = 723; id <= 809; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 8) {
          for (let id = 810; id <= 906; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } else if (gen == 9) {
          for (let id = 907; id <= 1025; id++) {
            await this.fetchAndStorePokemon(id);
          }
        } 

        // Add similar conditions for Gen 3 to Gen 9 as needed
      },
      async fetchAndStorePokemon(id) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          this.pokemonList.push({
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default
          });
        } catch (error) {
          console.error(`Error fetching data for Pokémon ID ${id}:`, error);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles */
  img {
    max-height: 150px; /* Optional: Set a maximum height for sprites */
  }
  
  /* Custom media query for landscape orientation */
  @media (orientation: landscape) {
    .grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  
  @media (orientation: portrait) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  </style>
  