<template>
  <div 
    v-if="isVisible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ formatMoveName(move) }}</h2>
        <button 
          @click="close" 
          class="text-xl text-red-500 hover:text-red-700 focus:outline-none"
        >
          ×
        </button>
      </div>

      <div v-if="move.description" class="mb-4">
        <p><strong>Description:</strong> {{ move.description }}</p>
      </div>
      <div v-else class="mb-4">
        <p><strong>Description:</strong> No description available.</p>
      </div>

      <div class="mb-4">
        <p><strong>Type:</strong> {{ move.type || 'N/A' }}</p>
      </div>
      <div class="mb-4">
        <p><strong>Power:</strong> {{ move.power !== null ? move.power : 'N/A' }}</p>
      </div>
      <div class="mb-4">
        <p><strong>Accuracy:</strong> {{ move.accuracy !== null ? move.accuracy : 'N/A' }}</p>
      </div>

      <!-- Tombol Favorit -->
      <button 
        @click="markAsFavorite"
        :class="{
          'bg-green-500': !isFavorited,
          'bg-gray-400': isFavorited,
        }"
        class="mt-4 px-4 py-2 text-white rounded hover:bg-green-700 transition duration-200"
        :disabled="isFavorited"
      >
        {{ isFavorited ? 'Favorited' : 'Favorite' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoveDetailPopup',
  props: {
    move: Object,
    isVisible: Boolean,
  },
  data() {
    return {
      isFavorited: false, // Status untuk cek apakah sudah favorit atau belum
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    formatMoveName(move) {
      // Cek jika move.url ada dan formatnya benar
      if (move && move.name && move.url) {
        // Ekstrak ID dari URL
        const id = move.url.split('/')[6]; // Ambil ID dari URL seperti https://pokeapi.co/api/v2/move/{id}/
        return `${id} - ${this.capitalize(move.name)}`;
      }

      // Jika ID atau name tidak ditemukan, tampilkan error
      return 'Unknown Move';
    },

    capitalize(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async markAsFavorite() {
      if (this.isFavorited) return;

      const token = localStorage.getItem('token'); 
      if (!token) {
        alert('Token tidak ditemukan. Anda harus login terlebih dahulu.');
        return;
      }

      // console.log('Move object:', this.move);
      const moveId = this.move.url.split('/')[6]; // Ambil ID dari URL
      if (!moveId) {
        alert('ID move tidak ditemukan!');
        return;
      }

      // console.log('Trying to favorite move with ID:', moveId);

      // Persiapkan data untuk dikirim ke backend
      const requestData = {
        moveId: moveId,        // Menggunakan moveId yang diambil dari URL
        moveName: this.capitalize(this.move.name),  // Kirim nama move
        moveType: this.move.type,    // Kirim tipe move
      };

      try {
        const response = await fetch('http://localhost:3000/favorite-moves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Mengirim token di header Authorization
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        if (response.ok) {
          this.isFavorited = true; // Tandai sebagai favorit
          alert('Move berhasil ditambahkan ke favorit!');
        } else {
          alert('Gagal menambahkan move ke favorit: ' + data.message);
        }
      } catch (err) {
        alert('Terjadi kesalahan saat menambahkan move ke favorit.');
      }
    },
  },
  watch: {
    move: {
      immediate: true,
      handler() {
        this.isFavorited = false;
      },
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
