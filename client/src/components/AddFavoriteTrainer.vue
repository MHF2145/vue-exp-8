<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg custom-width">
      <h2 class="text-2xl font-semibold mb-4">Add Favorite Trainer</h2>
      <form @submit.prevent="addFavoriteTrainer">
        <div class="mb-4">
          <label for="trainer" class="block text-lg">Select Trainer:</label>
          <select v-model="selectedTrainerId" id="trainer" class="border rounded p-2 w-full">
            <option disabled value="">Choose a trainer</option>
            <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">
              {{ trainer.username }}
            </option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closePopup" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Trainer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddFavoriteTrainer',
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      selectedTrainerId: '',  // ID of the selected trainer
      trainers: [],  // List of trainers
    };
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    // Fetch trainers list from the backend
    fetchTrainers() {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        })
          .then(response => response.json())
          .then(data => {
            if (data.users) {
              this.trainers = data.users;  // Update the trainers list with the response
            } else {
              console.error('No trainers found in response');
            }
          })
          .catch(error => {
            console.error('Error fetching trainers:', error);
          });
      }
    },
    // Add the selected trainer to the favorite trainers list
    addFavoriteTrainer() {
  const token = localStorage.getItem('token');
  const trainerId = this.selectedTrainerId;

  if (!trainerId) {
    console.error('Trainer ID is required');
    return;  // Jangan kirim request jika trainer_id kosong
  }

  //console.log('Sending trainerId:', trainerId);  

  if (trainerId && token) {
    fetch('http://localhost:3000/favorite-trainers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ trainer_id: trainerId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          this.$emit('trainerAdded');
          this.closePopup();
        }
      })
      .catch(error => {
        console.error('Error adding favorite trainer:', error);
      });
  }
},


  },
  created() {
    this.fetchTrainers();  // Fetch list of trainers when component is created
  },
};
</script>

<style scoped>
/* Custom width in percentage without using Tailwind classes */
.custom-width {
  width: 33.333%; 
}

.fixed {
  z-index: 9999;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
.bg-white {
  background-color: white;
}
</style>
