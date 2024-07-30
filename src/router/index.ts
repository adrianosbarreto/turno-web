/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
import { createRouter, createWebHistory } from 'vue-router';

// Importação dos componentes
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import Home from "@/views/Home.vue";
import Expenses from "@/views/Expenses.vue";
import Checks from "@/views/Checks.vue";
import CheckControl from "@/views/admin/CheckControl.vue";
import CreatePurchase from "@/views/CreatePurchase.vue";
import NotFound from "@/views/NotFound.vue";


const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
  },
  {
    path: '/expenses/new',
    name: 'NewExpenses',
    component: CreatePurchase,
  },
  {
    path: '/checks',
    name: 'Checks',
    component: Checks,
  },
  {
    path: '/incomes',
    name: 'incomes',
    component: Checks,
  },
  {
    path: '/admin',
    name: 'CheckControl',
    component: CheckControl,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }


  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // },
  // {
  //   path: '/users',
  //   name: 'UsersIndex',
  //   component: UsersIndex,
  //   children: [
  //     {
  //       path: 'profile',
  //       name: 'UsersProfile',
  //       component: UsersProfile
  //     }
  //   ]
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
