import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import LandingPage from './components/LandingPage.vue';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';

// Define the routes
const routes = [
  { path: '/', component: LandingPage },  // LandingPage di rute '/'
  { path: '/login', component: UserLogin },
  { path: '/register', component: UserRegister },
  {
    path: '/dashboard',
    component: MainLayout,
    children: [
      // Add child routes for the dashboard here
    ],
    meta: { requiresAuth: true } // Menambahkan meta untuk menandakan route ini membutuhkan otentikasi
  }
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware untuk mengecek otentikasi
router.beforeEach((to, from, next) => {
  // Jika route membutuhkan otentikasi (meta.requiresAuth)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Cek apakah token ada di localStorage
    const token = localStorage.getItem('token');
    
    // Jika tidak ada token, arahkan ke halaman login
    if (!token) {
      next({ path: '/login' });
    } else {
      // Jika ada token, lanjutkan ke halaman yang diminta
      next();
    }
  } else {
    // Jika tidak membutuhkan otentikasi, lanjutkan ke halaman yang diminta
    next();
  }
});

export default router;
