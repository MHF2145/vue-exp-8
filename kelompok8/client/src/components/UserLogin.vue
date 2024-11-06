<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });
        alert(response.data.message);
        
        // Simpan token di localStorage
        localStorage.setItem('token', response.data.token);
        
        // Redirect ke halaman dashboard setelah login sukses
        this.$router.push('/dashboard');
      } catch (error) {
        alert(error.response.data.message || 'Login failed');
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styling here if needed */
</style>
