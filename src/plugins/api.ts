import { useConfig } from '@/bundles/runtimeConfig/useConfig';
import { useContext, Context, PluginInject } from '@uvue/core';
import { AxiosInstance } from 'axios';
import { CartRow } from './pinia';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
}

export interface User {
  email: string;
}

function createApi(http: AxiosInstance) {
  async function getProducts() {
    const { data } = await http.get<Product[]>('/api/products');
    return data;
  }

  async function getProduct(id: string) {
    const { data } = await http.get<Product[]>(`/api/products/${id}`);
    return data;
  }

  async function getCart(): Promise<CartRow[]> {
    const products = await getProducts();
    const { data: cart } = await http.get<{ id: number; qty: number }[]>('/api/cart');

    return cart.map(row => {
      return {
        product: products.find(p => p.id == row.id),
        qty: row.qty,
      } as CartRow;
    });
  }

  function updateCartRow(productId: number, qty = 0) {
    return http.post('/api/cart', {
      id: productId,
      qty,
    });
  }

  async function login(body: { email: string }) {
    const { data } = await http.post<User>('/api/login', body);
    return data;
  }

  function logout() {
    return http.post('/api/logout');
  }

  async function getProfile() {
    const { data } = await http.get<User>('/api/profile');
    return data;
  }

  async function setStatus(body: { status?: string }) {
    const { data } = await http.post<string>('/api/status', body);
    return data;
  }

  return {
    getProducts,
    getProduct,
    getCart,
    updateCartRow,
    login,
    logout,
    getProfile,
    setStatus,
  };
}

export type APIService = ReturnType<typeof createApi>;

export default function({ $axios }: Context, inject: PluginInject) {
  const api = createApi($axios);
  inject('api', api);
}

export function useApi() {
  const { $api, $axios } = useContext();

  const config = useConfig();
  $axios.defaults.baseURL = config.apiUrl;

  return $api;
}
