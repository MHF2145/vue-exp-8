<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // Cek jika token ada di localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Jika token ada, arahkan ke halaman dashboard
      this.$router.push('/dashboard');
    }
  },
};
</script>
