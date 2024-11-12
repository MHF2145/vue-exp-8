<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
    <img class="logo-img" src="../assets/pokelogo.webp" alt="logo">
    <div class="text-center bg-white p-8 rounded-lg shadow-2xl border-4 border-yellow-300 max-w-md w-full">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-800">Welcome to Pokedex App</h1>
      <p class="text-gray-700 mb-8 text-lg">
        Explore Pokémon and manage your favorites. Start by logging in or creating an account!
      </p>
      <div class="flex justify-center space-x-4">
        <router-link to="/login">
          <button class="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
            Login
          </button>
        </router-link>
        <router-link to="/register">
          <button class="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
            Register
          </button>
        </router-link>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-white text-lg mb-4">Or continue as a guest to explore Pokémon</p>
      <GenButtonGuest />
    </div>
  </div>
</template>

<script>
import GenButtonGuest from './GenButtonGuest.vue';

export default {
  name: 'LandingPage',
  components: {
    GenButtonGuest,
  },
};
</script>

<style scoped>
.mt-8 {
  margin-top: 2rem;
}

.logo-img {
  width: 300px; 
  height: auto; 
}
</style>