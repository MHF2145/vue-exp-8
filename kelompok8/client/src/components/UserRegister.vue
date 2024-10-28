<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-4">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
            class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-center">
        Already have an account? 
        <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://localhost:3000/register", {
          username: this.username,
          password: this.password
        });
        alert("Registration successful!");
        // Redirect to the login page after successful registration
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        alert("Registration failed");
      }
    }
  }
};
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
