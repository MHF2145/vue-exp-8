<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-4">Protected Content</h2>
      <button
        @click="getProtectedContent"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Fetch Protected Content
      </button>
      <p class="mt-4 text-gray-700">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    async getProtectedContent() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/protected", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.message = response.data.message;
      } catch (error) {
        console.error(error);
        this.message = "Access denied";
      }
    }
  }
};
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
