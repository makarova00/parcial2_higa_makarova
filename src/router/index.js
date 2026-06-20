import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AgregarView from '../views/AgregarView.vue'
import BibliotecaView from '../views/BibliotecaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: AgregarView,
    },
    {
      path: '/biblioteca',
      name: 'biblioteca',
      component: BibliotecaView,
    },
  ],
})

export default router
