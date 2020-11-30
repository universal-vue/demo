import { defineComponent, h } from 'vue';
import { useContext } from '@uvue/core';
import { RouteRecordRaw } from 'vue-router';

const NotFound = defineComponent(function NotFound() {
  const { response } = useContext();
  response.status = 404;
  return () => h('div', { class: 'container mx-auto p-5 text-center' }, 'Page not found!');
});

export const notFoundRoute: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  component: NotFound,
};

export default NotFound;
