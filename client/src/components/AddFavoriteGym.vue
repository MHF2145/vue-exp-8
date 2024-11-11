<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
      <button 
        @click="closePopup" 
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
      >
        &times;
      </button>
      
      <h2 class="text-2xl font-semibold mb-4 text-center">Add Favorite Gym</h2>
      
      <!-- Form untuk menambahkan gym favorit -->
      <form @submit.prevent="addGym">
        <div class="mb-4">
          <label for="gymName" class="block text-gray-700">Gym Name:</label>
          <input 
            type="text" 
            id="gymName" 
            v-model="gymName" 
            class="w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        
        <div class="mb-4">
          <label for="gymLeader" class="block text-gray-700">Gym Leader:</label>
          <input 
            type="text" 
            id="gymLeader" 
            v-model="gymLeader" 
            class="w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        
        <div class="mb-4">
          <label for="region" class="block text-gray-700">Region:</label>
          <input 
            type="text" 
            id="region" 
            v-model="region" 
            class="w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        
        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Add Gym
        </button>
      </form>
      
      <!-- Tampilkan pesan berhasil jika berhasil menambahkan gym -->
      <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
      
      <!-- Tampilkan pesan error jika terjadi kesalahan -->
      <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gymName: '',
      gymLeader: '',
      region: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async addGym() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/favorite-gyms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            gymName: this.gymName,
            gymLeader: this.gymLeader,
            region: this.region,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add gym');
        }

        const data = await response.json();
        this.successMessage = data.message;
        this.errorMessage = '';
        
        // Reset form dan close popup setelah berhasil menambahkan
        this.gymName = '';
        this.gymLeader = '';
        this.region = '';
        
        this.$emit('close'); 
      } catch (error) {
        this.errorMessage = error.message;
        this.successMessage = '';
      }
    },
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Styling untuk popup */
</style>
