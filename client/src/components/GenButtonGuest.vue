<template>
    <div class="flex flex-col items-center">
        <PopUpGuest v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null"
            @favorite="markFavorite" @switch="switchPokemon" />

        <div class="mt-4">
            <select v-model="selectedGeneration" @change="fetchPokemon(selectedGeneration)"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                <option disabled value="">Select Generation</option>
                <option v-for="i in 9" :key="i" :value="i">
                    Gen {{ i }}
                </option>
            </select>
        </div>

        <div v-if="selectedGeneration"
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-6 w-full px-4">
            <button v-for="pokemon in paginatedPokemon" :key="pokemon.id"
                class="bg-white rounded shadow p-2 flex flex-col items-center justify-center"
                @click="showPopup(pokemon)">
                <img :src="pokemon.sprite" :alt="pokemon.name" class="w-full h-auto object-contain mb-2" />
                <h2 class="text-lg font-semibold truncate">{{ pokemon.name }}</h2>
            </button>
        </div>

        <div v-if="selectedGeneration" class="flex space-x-4 mt-4">
            <button v-if="currentPage > 1" @click="prevPage"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                Previous
            </button>
            <button v-if="currentPage < totalPages" @click="nextPage"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                Next
            </button>
        </div>
    </div>
</template>

<script>
// Import PopUpGuest instead of PopUp
import PopUpGuest from "./PopUpGuest.vue";

export default {
    components: { PopUpGuest },
    data() {
        return {
            pokemonList: [],
            selectedGeneration: null,
            currentPage: 1,
            itemsPerPage: 24,
            selectedPokemon: null,
            favorites: [], // Track favorited Pokémon
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
        },
    },
    methods: {
        async fetchPokemon(gen) {
            this.pokemonList = [];
            this.currentPage = 1;
            const genRanges = [
                { gen: 1, range: [1, 151] },
                { gen: 2, range: [152, 251] },
                { gen: 3, range: [252, 386] },
                { gen: 4, range: [387, 494] },
                { gen: 5, range: [495, 649] },
                { gen: 6, range: [650, 722] },
                { gen: 7, range: [723, 809] },
                { gen: 8, range: [810, 906] },
                { gen: 9, range: [907, 1025] },
            ];
            const range = genRanges.find((g) => g.gen === gen)?.range;
            if (range) {
                for (let id = range[0]; id <= range[1]; id++) {
                    await this.fetchAndStorePokemon(id);
                }
            }
        },
        async fetchAndStorePokemon(id) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                this.pokemonList.push({
                    id: data.id,
                    name: data.name,
                    height: data.height / 10, // Height in meters
                    types: data.types,
                    abilities: data.abilities,
                    sprite: data.sprites.front_default,
                });
            } catch (error) {
                console.error(`Error fetching data for Pokémon ID ${id}:`, error);
            }
        },
        showPopup(pokemon) {
            this.selectedPokemon = pokemon;
        },
        markFavorite(pokemon) {
            if (!this.favorites.find((fav) => fav.id === pokemon.id)) {
                this.favorites.push(pokemon);
                console.log(`${pokemon.name} added to favorites.`);
            }
        },
        switchPokemon(direction) {
            const currentIndex = this.pokemonList.findIndex(p => p.id === this.selectedPokemon.id);
            if (direction === 'next' && currentIndex < this.pokemonList.length - 1) {
                this.selectedPokemon = this.pokemonList[currentIndex + 1];
            } else if (direction === 'previous' && currentIndex > 0) { // Update this line
                this.selectedPokemon = this.pokemonList[currentIndex - 1];
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
        },
    },
};
</script>

<style scoped>
img {
    max-height: 150px;
}
</style>