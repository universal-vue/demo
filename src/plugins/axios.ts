import { useContext, Context, PluginInject } from '@uvue/core';
import axios from 'axios';

export default function({ req, isServer }: Context, inject: PluginInject) {
  const headers: Record<string, string> = {};
  if (isServer && req?.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const http = axios.create({
    baseURL: isServer ? 'http://localhost:8080' : '/',
    headers,
  });

  inject('axios', http);
}

export function useAxios() {
  const { $axios } = useContext();
  return $axios;
}
