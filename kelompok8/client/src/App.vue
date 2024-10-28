<template>
  <div id="app" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold mb-6">Welcome</h1>
    <nav class="mb-4">
      <router-link
        to="/login"
        class="text-blue-500 hover:text-blue-700 mx-2 transition duration-200"
      >
        Login
      </router-link>
      |
      <router-link
        to="/register"
        class="text-blue-500 hover:text-blue-700 mx-2 transition duration-200"
      >
        Register
      </router-link>
      |
      <router-link
        to="/protected"
        class="text-blue-500 hover:text-blue-700 mx-2 transition duration-200"
      >
        Protected
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
/* You can include additional styles here if needed */
</style>
