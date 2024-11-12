<template>
  <div class="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
    <!-- Tombol Home di pojok kiri atas -->
    <router-link to="/" class="absolute top-4 left-4 bg-white text-red-500 hover:text-red-700 font-semibold py-2 px-4 rounded-lg shadow-md">
      Home
    </router-link>

    <div class="bg-white p-8 rounded-lg shadow-2xl border-4 border-yellow-300 max-w-md w-full">
      <h2 class="text-3xl font-extrabold text-center mb-6 text-gray-800">Register</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-semibold">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        <button type="submit" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-semibold">
          Register
        </button>
      </form>
      
      <p class="mt-4 text-center text-gray-600">
        Already have an account? 
        <router-link to="/login" class="text-yellow-500 hover:text-yellow-700 font-semibold">Login Here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert('Registration failed. Please check your connection or try again.');
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styling here if needed */
</style>