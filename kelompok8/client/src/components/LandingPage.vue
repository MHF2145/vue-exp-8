<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div class="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">Welcome to Pokedex App</h1>
        <p class="text-gray-600 mb-8">
          Explore Pokémon and manage your favorites. Start by logging in or creating an account!
        </p>
        <div class="flex justify-center space-x-4">
          <router-link to="/login">
            <button class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
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
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
  };
  </script>
  
  <style scoped>
  /* Add any specific styles here if needed */
  </style>
  