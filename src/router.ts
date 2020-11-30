import { createRouter } from 'vue-router';
import { createRouterHistory } from '@uvue/core';

import ProductsListView from './views/ProductsListView.vue';
import { isAnonymous, isLogged } from './middlewares/userAuth';
import { notFoundRoute } from './views/NotFound';

export default () => {
  return createRouter({
    history: createRouterHistory(),
    routes: [
      {
        path: '/',
        component: ProductsListView,
      },
      {
        path: '/product/:id',
        component: () => import('./views/ProductView.vue'),
      },
      {
        path: '/cart',
        component: () => import('./views/CartView.vue'),
      },
      {
        path: '/login',
        component: () => import('./views/LoginView.vue'),
        meta: {
          middlewares: [isAnonymous],
        },
      },
      {
        path: '/profile',
        component: () => import('./views/ProfileView.vue'),
        meta: {
          middlewares: [isLogged],
        },
      },
      notFoundRoute,
    ],
  });
};
