import { getDataFromSSR, useContext, Context, PluginInject } from '@uvue/core';
import { createPinia, defineStore, getRootState, setActiveReq, setStateProvider } from 'pinia';
import { APIService, Product } from './api';

export interface CartRow {
  product: Product;
  qty: number;
}

interface State {
  user: {
    email: string;
  } | null;
  cart: CartRow[];
}

function createStore(api: APIService) {
  return defineStore({
    id: 'main',
    state() {
      return {
        user: null,
        cart: [],
      } as State;
    },
    actions: {
      /**
       * Get current cart
       */
      async getCart() {
        this.cart = await api.getCart();
        return this.cart;
      },

      /**
       * Add product to cart
       */
      async addProduct(product: Product, qty = 1) {
        // Backend update
        await api.updateCartRow(product.id, qty);

        // Update on store
        const row = this.cart.find(r => r.product.id === product.id);
        if (row) {
          row.qty += qty;
        } else {
          this.cart.push({
            product,
            qty,
          });
        }
      },

      /**
       * Remove product from cart
       */
      async removeProduct(product: Product, qty = 0) {
        // Backend update
        await api.updateCartRow(product.id, -1 * qty);

        // Update on store
        const index = this.cart.findIndex(r => r.product.id === product.id);
        if (index >= 0) {
          if (qty === undefined || qty === 0) {
            // Remove completly
            this.cart.splice(index, 1);
          } else {
            // Remove just qty
            this.cart[index].qty -= qty;
            if (this.cart[index].qty <= 0) {
              this.cart.splice(index, 1);
            }
          }
        }
      },
    },
  });
}

export type UseStore = ReturnType<typeof createStore>;

export default async function(context: Context, inject: PluginInject) {
  const { app, data, isServer, $api } = context;
  const pinia = createPinia();

  setActiveReq(pinia);

  if (!isServer) {
    // Populate store from SSR
    setStateProvider(() => {
      return getDataFromSSR().$pinia;
    });
  }

  app.use(pinia);

  const useStore = createStore($api);
  const store = useStore(pinia);

  // Initial request / onHttpRequest
  if (isServer) {
    await store.getCart();
    data.$pinia = getRootState(pinia);
  }

  inject('useStore', useStore);
}

export function useStore() {
  const { $useStore } = useContext();
  return $useStore();
}
