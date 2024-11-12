<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
        <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 text-center transform transition-transform duration-300 ease-in-out scale-100">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">
                    {{ pokemon.id }} - {{ pokemon.name }}
                </h2>
                <button @click="$emit('close')" class="text-red-500 hover:text-red-700 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <img :src="currentSprite" :alt="pokemon.name" class="sprite my-4 mx-auto rounded-full border-4 border-gray-200 shadow-md" />

            <div class="flex justify-center mb-4 text-gray-700">
                <p class="mr-4"><strong>Height:</strong> {{ pokemon.height }} m</p>
                <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
            </div>
            <div class="mb-4">
                <p class="text-lg font-semibold text-gray-800"><strong>Abilities:</strong></p>
                <ul class="flex space-x-2 justify-center">
                    <li v-for="ability in pokemon.abilities" :key="ability.ability.name"
                        class="bg-gray-200 rounded px-2 py-1 shadow-sm">
                        {{ ability.ability.name }}
                    </li>
                </ul>
            </div>
            <div class="mb-4">
                <p class="text-lg font-semibold text-gray-800"><strong>Top 4 Moves Learned:</strong></p>
                <ul class="flex space-x-2 justify-center">
                    <li v-for="move in topMoves" :key="move.move.name" class="bg-gray-200 rounded px-2 py-1 shadow-sm">
                        {{ move.move.name }}
                    </li>
                </ul>
            </div>
            <div class="mb-4">
                <p class="text-lg font-semibold text-gray-800"><strong>Types:</strong></p>
                <ul class="flex space-x-2 justify-center">
                    <li v-for="type in pokemon.types" :key="type.type.name" class="bg-gray-200 rounded px-2 py-1 shadow-sm">
                        {{ type.type.name }}
                    </li>
                </ul>
            </div>
            <div class="mb-4">
                <p class="text-lg font-semibold text-gray-800"><strong>Cry:</strong></p>
                <div class="flex justify-center">
                    <audio controls :src="pokemonCry" type="audio/mpeg" class="rounded shadow-sm">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-center items-center space-x-4 my-4">
                <button @click="switchPokemon('previous')"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 shadow-md">
                    Previous
                </button>
                <button @click="switchPokemon('next')"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 shadow-md">
                    Next
                </button>
            </div>

            <!-- Tombol Favorit -->
            <button @click="markAsFavorite"
                :class="{
                    'bg-green-500': !isFavorited,
                    'bg-gray-400': isFavorited,
                }"
                class="mt-4 px-4 py-2 text-white rounded hover:bg-green-700 transition duration-200"
                :disabled="isFavorited">
                {{ isFavorited ? 'Favorited' : 'Favorite' }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pokemon: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            currentSprite: this.pokemon.sprite,
            topMoves: [],
            isFavorited: false, // Status favorit
        };
    },
    computed: {
        pokemonCry() {
            return `https://play.pokemonshowdown.com/audio/cries/${this.pokemon.name}.mp3`;
        },
    },
    methods: {
        async fetchTopMoves() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}`);
            const data = await response.json();
            this.topMoves = data.moves.slice(0, 4); 
        },
        async markAsFavorite() {
            if (this.isFavorited) return;

            const token = localStorage.getItem('token');
            
            if (!token) {
                alert('Token tidak ditemukan. Anda harus login terlebih dahulu.');
                return;
            }

            try {
                // Mengirim request untuk menambahkan Pokémon ke favorit
                const response = await fetch('http://localhost:3000/favorite-pokemons', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify({ pokemonId: this.pokemon.id }),
                });

                const data = await response.json();
                if (response.ok) {
                    this.isFavorited = true; // Tandai sebagai favorit
                    alert('Pokémon berhasil ditambahkan ke favorit!');
                } else {
                    alert('Gagal menambahkan Pokémon ke favorit: ' + data.message);
                }
            } catch (err) {
                console.error('Error adding to favorites:', err);
                alert('Terjadi kesalahan saat menambahkan Pokémon ke favorit.');
            }
        },

        switchPokemon(direction) {
            this.$emit('switch', direction);
        },
    },
    watch: {
        pokemon: {
            immediate: true,
            handler(newPokemon) {
                this.currentSprite = newPokemon.sprite; // Update sprite saat Pokémon berubah
                this.fetchTopMoves(); // Fetch moves baru saat Pokémon berubah
                // computed property pokemonCry akan otomatis mereturn URL cry yang baru
                this.isFavorited = false; // Reset favorit jika Pokémon berubah
            },
        },
    },
};
</script>

<style scoped>
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.sprite {
    width: 3cm;
    height: 3cm;
    object-fit: contain;
}

.favorite-btn {
    cursor: pointer;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 90%;
    text-align: center;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>