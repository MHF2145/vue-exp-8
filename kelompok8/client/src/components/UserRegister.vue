<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
      <form @submit.prevent="registerUser">
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
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
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
          Register
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
        
        // Menyimpan token di localStorage (jika perlu untuk autentikasi)
        localStorage.setItem('token', response.data.token);
        
        // Tampilkan pesan sukses
        alert(response.data.message);

        // Redirect ke halaman dashboard setelah berhasil registrasi
        this.$router.push('/dashboard');
      } catch (error) {
        alert(error.response.data.message || 'Registration failed');
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styling here if needed */
</style>
