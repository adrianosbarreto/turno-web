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
import Incomes from "@/views/Incomes.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import MainLayout from "@/layout/MainLayout.vue";

import { isAuthenticated, isAdmin } from "@/services/AuthService";
import CreateCheck from "@/views/CreateCheck.vue";
import CheckDetail from "@/views/admin/CheckDetail.vue";

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/signup',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Signup',
        component: SignUp
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: '/expenses',
        name: 'Expenses',
        component: Expenses,
        meta: { requiresAuth: true }
      },
      {
        path: '/expenses/new',
        name: 'Purchase',
        component: CreatePurchase,
        meta: { requiresAuth: true }
      },
      {
        path: '/checks',
        name: 'Checks',
        component: Checks,
        meta: { requiresAuth: true }
      },
      {
        path: '/checks/new',
        name: 'Checks Deposit',
        component: CreateCheck,
        meta: { requiresAuth: true }
      },
      {
        path: '/incomes',
        name: 'Incomes',
        component: Incomes,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin/check-control',
        name: 'CheckControl',
        component: CheckControl,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/admin/checks/:id',
        name: 'Check Detail',
        component: CheckDetail,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
        meta: { requiresAuth: true }
      },
    ]
  }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin()) {
      next({
        path: '/unauthorized',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
