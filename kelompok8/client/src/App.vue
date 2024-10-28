<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">My App</h1>
        <div class="flex space-x-4">
          <router-link
            to="/login"
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Register
          </router-link>
          <router-link
            to="/protected"
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Protected
          </router-link>
        </div>
      </div>
    </nav>

    <div class="flex flex-col items-center justify-center flex-grow">
      <h1 class="text-4xl font-bold mb-6">Welcome</h1>
      <div class="flex space-x-2 mt-4">
        <button
          v-for="i in 9"
          :key="i"
          @click="fetchPokemon(i)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Gen {{ i }}
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-full max-w-4xl">
        <div
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          class="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          <img :src="pokemon.sprite" :alt="pokemon.name" class="w-20 h-20 object-contain mb-2" />
          <h2 class="text-lg font-semibold">{{ pokemon.name }}</h2>
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      pokemonList: []
    };
  },
  methods: {
    async fetchPokemon(gen) {
      if (gen === 1) {
        // Fetch Pokémon data for IDs 1 to 151 (Generation 1)
        this.pokemonList = [];
        for (let id = 1; id <= 151; id++) {
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
        }
      }
    }
  }
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
