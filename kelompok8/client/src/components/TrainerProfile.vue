<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-6">Trainer Profile</h2>
    
    <div class="mb-4">
      <label for="player-name" class="block mb-2">Name Player:</label>
      <input
        id="player-name"
        type="text"
        v-model="playerName"
        placeholder="Enter your name"
        class="border rounded p-2 w-full"
      />
    </div>

    <h3 class="text-2xl font-semibold mb-4 mt-6">Favorite Cards</h3>
    <div class="grid grid-cols-6 gap-4">
      <div v-for="index in 18" :key="index" class="border rounded p-4 bg-gray-100">
        Pokemon Card {{ index }}
      </div>
    </div>

    <div v-for="section in sections" :key="section.title" class="mb-6">
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-semibold">{{ section.title }}</h3>
        <button @click="toggleEdit(section)" class="bg-blue-500 text-white rounded px-4 py-2">
          {{ section.isEditing ? 'Confirm' : 'Edit' }}
        </button>
      </div>
      <div v-if="section.isEditing" class="mt-4">
        <button @click="fetchData(section)" class="bg-green-500 text-white rounded px-2 py-1 mb-2">Fetch Data</button>
      </div>
      <div v-show="section.isEditing || section.isOpen" class="border rounded p-4 bg-gray-100 mt-4">
        <ul class="flex flex-wrap space-x-2 justify-center">
          <li v-for="item in section.items" :key="item" class="bg-gray-200 rounded px-2 py-1">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainerProfile',
  data() {
    return {
      playerName: '',
      sections: [
        { title: 'Top 10 Favorite Pokemon Move Cards', items: [], isEditing: false, isOpen: false },
        { title: 'Top Trainer Friends', items: [], isEditing: false, isOpen: false },
        { title: 'Top Items', items: [], isEditing: false, isOpen: false },
        { title: 'Favorite Gyms', items: [], isEditing: false, isOpen: false },
      ]
    };
  },
  methods: {
    toggleEdit(section) {
      section.isEditing = !section.isEditing;
      section.isOpen = false; // Close the dropdown when switching to editing
    },
    fetchData(section) {
      // Simulated fetching data from PokéAPI
      let apiUrl = '';
      switch (section.title) {
        case 'Top 10 Favorite Pokemon Move Cards':
          apiUrl = 'https://pokeapi.co/api/v2/move?limit=10';
          break;
        case 'Top Trainer Friends':
          apiUrl = 'https://pokeapi.co/api/v2/trainer?limit=5'; // Example endpoint
          break;
        case 'Top Items':
          apiUrl = 'https://pokeapi.co/api/v2/item?limit=3';
          break;
        case 'Favorite Gyms':
          apiUrl = 'https://pokeapi.co/api/v2/gym?limit=3'; // Example endpoint
          break;
      }
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Modify this based on the actual API response structure
          section.items = data.results.map(item => item.name); // Assuming items have a `name` property
          section.isOpen = true; // Open the dropdown after fetching
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      
      section.isEditing = false; // Switch back to confirm state after fetching
    }
  }
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
