<template>
  <div id="main-layout" class="flex flex-col min-h-screen bg-gray-100">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Home Button -->
        <button 
          @click="goHome" 
          class="text-2xl font-bold text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
          Home
        </button>
        <!-- Navigation Links -->
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
          <!-- Trainer Button -->
          <button
            @click="showTrainer"
            class="text-blue-500 hover:text-blue-700 transition duration-200 bg-transparent border-none cursor-pointer">
            Trainer
          </button>
          <!-- Logout Button -->
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
    <div class="flex flex-col items-center justify-center flex-grow">
      <!-- Conditionally render content based on isTrainerPage -->
      <h1 class="text-4xl font-bold mb-6" v-if="!isTrainerPage">Welcome</h1>
      <GenButton v-if="!isTrainerPage" />
      <TrainerProfile v-if="isTrainerPage" />
      <router-view v-if="!isTrainerPage" />
    </div>
  </div>
</template>

<script>
import GenButton from './GenButton.vue';
import TrainerProfile from './TrainerProfile.vue';

export default {
  name: 'MainLayout',
  components: {
    GenButton,
    TrainerProfile,
  },
  data() {
    return {
      isTrainerPage: false,
    };
  },
  computed: {
    // Check if the user is authenticated by checking if the token exists in localStorage
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    }
  },
  methods: {
    goHome() {
      this.isTrainerPage = false;
      this.$router.push('/dashboard'); // Navigate to the landing page
    },
    showTrainer() {
      this.isTrainerPage = true; // Show the trainer profile
    },
    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('token');
      // Redirect to the home page after logout
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
