<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            v-model="username" 
            required 
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-gray-600 text-sm">
        Don't have an account? 
        <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password
        });
        localStorage.setItem("token", response.data.token); // Store token for auth
        localStorage.setItem("username", this.username); // Store username for greeting
        this.$router.push("/hello"); // Redirect to HelloWorld.vue
        alert("Login berhasil!");
      } catch (error) {
        console.error(error);
        alert("Login gagal. Silakan coba lagi.");
      }
    }
  }
};
</script>

<style scoped>
/* Additional styling is usually unnecessary as Tailwind handles the main style needs. */
</style>
