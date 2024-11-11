import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import axios from 'axios';

// Membuat instance axios
const api = axios.create({
  baseURL: 'http://localhost:3000',  // Ganti dengan URL server Anda
});

// Menambahkan interceptor untuk menambahkan token ke setiap permintaan
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    
    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Membuat aplikasi Vue.js dan menggunakan axios instance (api)
const app = createApp(App);
app.config.globalProperties.$http = api; // Menambahkan axios instance ke Vue global properties

app.use(router);
app.mount('#app');
