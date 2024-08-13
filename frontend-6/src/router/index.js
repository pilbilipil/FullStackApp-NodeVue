import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import Login from '../components/Login.vue';
import Registration from '../components/Registration.vue';
import Shop from '../components/Shop.vue';
import Profile from '../components/Profile.vue';
import Cart from '../components/Cart.vue';
import Order from '../components/Order.vue';

const routes = [
  { path: '/', component: MainPage, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/registration', component: Registration, name: 'Registration'},
  { path: '/shop', component: Shop, name: 'Shop'},
  { path: '/profile', component: Profile, name: 'Profile'},
  { path: '/cart', component: Cart, name: 'Cart'},
  { path: '/order', component: Order, name: 'Order'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;