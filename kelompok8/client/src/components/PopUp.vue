<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 text-center">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold">
                    {{ pokemon.id }} - {{ pokemon.name }}
                </h2>
                <button @click="$emit('close')" class="text-red-500">X</button>
            </div>
            <img :src="currentSprite" :alt="pokemon.name" class="sprite my-4 mx-auto" />

            <div class="flex justify-center mb-4">
                <p class="mr-4"><strong>Height:</strong> {{ pokemon.height }} m</p>
                <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
            </div>
            <div class="mb-4">
                <p><strong>Abilities:</strong></p>
                <ul class="flex space-x-2 justify-center">
                    <li v-for="ability in pokemon.abilities" :key="ability.ability.name"
                        class="bg-gray-200 rounded px-2 py-1">
                        {{ ability.ability.name }}
                    </li>
                </ul>
            </div>
            <div class="mb-4">
                <p><strong>Top 4 Moves Learned:</strong></p>
                <ul class="flex space-x-2 justify-center">
                    <li v-for="move in topMoves" :key="move.move.name" class="bg-gray-200 rounded px-2 py-1">
                        {{ move.move.name }}
                    </li>
                </ul>
            </div>
            <div class="mb-4">
                <p><strong>Types:</strong></p>
                <ul class="flex space-x-2 justify-center">
                    <li v-for="type in pokemon.types" :key="type.type.name" class="bg-gray-200 rounded px-2 py-1">
                        {{ type.type.name }}
                    </li>
                </ul>
            </div>
            <div class="mb-4">
                <p><strong>Cry:</strong></p>
                <div class="flex justify-center">
                    <audio controls :src="pokemonCry" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-center items-center space-x-4 my-4">
                <button @click="switchPokemon('previous')"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                    Previous
                </button>
                <button @click="switchPokemon('next')"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
                    Next
                </button>
            </div>


            <button @click="markAsFavorite"
                class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200">
                Favorite
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
            this.topMoves = data.moves.slice(0, 4); // Get the top 4 moves learned
        },
        markAsFavorite() {
            this.$emit("favorite", this.pokemon);
        },
        switchPokemon(direction) {
            this.$emit("switch", direction);
        },
    },
    watch: {
        pokemon: {
            immediate: true,
            handler(newPokemon) {
                this.currentSprite = newPokemon.sprite; // Update sprite when Pokémon changes
                this.fetchTopMoves(); // Fetch new moves when Pokémon changes
                // The computed property pokemonCry will automatically return the new cry URL
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
    /* Set width to 3cm */
    height: 3cm;
    /* Set height to 3cm for 1:1 aspect ratio */
    object-fit: contain;
    /* Ensures the image fits well in the box */
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