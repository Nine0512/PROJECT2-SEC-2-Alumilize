import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../view/SignInPage.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../view/SignupPage.vue'),
    },
    {
      path: '/AllBook',
      name: 'AllBook',
      component: () => import('../view/AllBook.vue'),
    },
  ]
})

export default router
