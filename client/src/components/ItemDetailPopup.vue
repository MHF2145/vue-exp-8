<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 text-center">
          <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">
                  {{ item.id }} - {{ itemName }}
              </h2>
              <button @click="$emit('close')" class="text-red-500">X</button>
          </div>
          <img :src="currentSprite" :alt="item.name" class="sprite my-4 mx-auto" />

          <div class="mb-4">
              <p><strong>Category:</strong> {{ itemCategory }}</p>
          </div>
          
          <div class="mb-4">
              <p><strong>Effect:</strong> {{ itemEffect }}</p>
          </div>

          <!-- Tombol Favorit -->
          <button @click="markAsFavorite"
              :class="{
                  'bg-green-500': !isFavorited,
                  'bg-gray-400': isFavorited,
              }"
              class="mt-4 px-4 py-2 text-white rounded hover:bg-green-700 transition duration-200"
              :disabled="isFavorited">
              {{ isFavorited ? 'Favorited' : 'Favorite' }}
          </button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      item: {
          type: Object,
          required: true,
      },
  },
  data() {
      return {
          currentSprite: this.item.sprite, // Item sprite
          itemEffect: '', // Effect for the item
          itemCategory: '', // Category for the item
          itemName: this.item.name, // Item name
          isFavorited: false, // Status of favorited item
      };
  },
  methods: {
      async fetchItemDetails() {
          // Fetch item details from the provided URL (assuming the item has a URL)
          if (this.item.url) {
              try {
                  const response = await fetch(this.item.url);
                  const data = await response.json();
                  this.itemEffect = data.effect_entries[0]?.effect || 'No effect available';
                  this.itemCategory = data.category.name || 'Unknown';
                  this.itemName = this.item.name || 'Unknown Name'; // Set item name if available
              } catch (err) {
                  console.error('Error fetching item details:', err);
              }
          }
      },

      async markAsFavorite() {
        if (this.isFavorited) return;

        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('Token tidak ditemukan. Anda harus login terlebih dahulu.');
            return;
        }

        // Prepare the data to be sent to the backend
        const requestData = {
            itemId: this.item.id,
            itemName: this.itemName,  
            itemCategory: this.itemCategory,  
        };

        try {
            const response = await fetch('http://localhost:3000/favorite-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (response.ok) {
                this.isFavorited = true; // Set as favorite
                alert('Item berhasil ditambahkan ke favorit!');
            } else {
                alert('Gagal menambahkan item ke favorit: ' + data.message);
            }
        } catch (err) {
            console.error('Error adding to favorites:', err);
            alert('Terjadi kesalahan saat menambahkan item ke favorit.');
        }
    },
  },
  watch: {
      item: {
          immediate: true,
          handler(newItem) {
              this.currentSprite = newItem.sprite; // Update sprite when item changes
              this.fetchItemDetails(); // Fetch item details
              this.isFavorited = false; // Reset favorite status when item changes
          },
      },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.sprite {
  width: 3cm;
  height: 3cm;
  object-fit: contain;
}

.favorite-btn {
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
