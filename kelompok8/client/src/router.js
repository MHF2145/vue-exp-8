import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from './components/UserLogin.vue';
import UserRegister from './components/UserRegister.vue';
import ProtectedPage from './components/ProtectedPage.vue';
import HelloWorld from './components/HelloWorld.vue';


const routes = [
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/protected', component: ProtectedPage },
    { path: '/hello', component: HelloWorld } // New route for HelloWorld
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
