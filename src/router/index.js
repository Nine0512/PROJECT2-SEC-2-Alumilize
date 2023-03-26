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
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('../view/Book.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../view/ManageBook.vue'),
      children: [
        {
          path: 'update/:id',
          name: 'update',
          component: () => import('../view/ManageBook.vue')
        }
      ]
    }
  ]
})

export default router
