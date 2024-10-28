<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">My App</h1>
        <div class="flex space-x-4">
          <router-link
            to=""
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Login
          </router-link>
          <router-link
            to=""
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Register
          </router-link>
          <router-link
            to=""
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Trainer
          </router-link>
        </div>
      </div>
    </nav>

    <div class="flex flex-col items-center justify-center flex-grow">
      <h1 class="text-4xl font-bold mb-6">Welcome</h1>
      <GenButton />
      <router-view />
    </div>
  </div>
</template>

<script>
import GenButton from './components/GenButton.vue';

export default {
  name: 'App',
  components: {
    GenButton
  }
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
