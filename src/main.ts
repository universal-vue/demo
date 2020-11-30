import { createApp } from '@uvue/core';
import App from './App.vue';
import createRouter from './router';
import './assets/tailwind.css';

export default createApp(App, app => {
  const router = createRouter();

  app.use(router);
});
