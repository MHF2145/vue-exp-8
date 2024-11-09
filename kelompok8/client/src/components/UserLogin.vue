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
        // Mengirim permintaan login ke server
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });
        
        // Jika berhasil, tampilkan pesan sukses dan simpan token
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        
        // Redirect ke halaman dashboard setelah login sukses
        this.$router.push('/dashboard');
      } catch (error) {
        // Pengecekan untuk memastikan error.response aman diakses
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          // Jika tidak ada response dari server, tampilkan pesan error default
          alert('Login failed. Please check your connection or try again.');
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styling here if needed */
</style>
