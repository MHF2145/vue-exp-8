<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <button 
          @click="goHome" 
          class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
          Home
        </button>
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
          <button
            @click="showTrainer"
            class="text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
            Trainer
          </button>
        </div>
      </div>
    </nav>

    <div class="flex flex-col items-center justify-center flex-grow">
      <h1 class="text-4xl font-bold mb-6" v-if="!isTrainerPage">Welcome</h1>
      <GenButton v-if="!isTrainerPage" />
      <TrainerProfile v-if="isTrainerPage" />
      <router-view v-if="!isTrainerPage" />
    </div>
  </div>
</template>

<script>
import GenButton from './components/GenButton.vue';
import TrainerProfile from './components/TrainerProfile.vue'; // Updated import

export default {
  name: 'App',
  components: {
    GenButton,
    TrainerProfile // Updated component registration
  },
  data() {
    return {
      isTrainerPage: false
    };
  },
  methods: {
    goHome() {
      this.isTrainerPage = false;
      this.$router.push('/');
    },
    showTrainer() {
      this.isTrainerPage = true;
    }
  }
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
