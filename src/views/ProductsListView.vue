<template>
  <div class="container mx-auto">
    <Head>
      <title>Products | UVue</title>
    </Head>
    <h1 class="text-center text-4xl m-6 font-bold">Products</h1>
    <div class="flex flex-wrap justify-center">
      <ProductsListItem v-for="item in items" :key="item.id" :product="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { usePrefetch } from '@uvue/core';
import { computed, defineComponent } from 'vue';
import ProductsListItem from '@/components/products/ProductsListItem.vue';
import { useApi } from '@/plugins/api';
import { Head } from '@egoist/vue-head';

export default defineComponent({
  components: {
    Head,
    ProductsListItem,
  },

  setup() {
    const api = useApi();

    const { data } = usePrefetch(() => api.getProducts());
    const items = computed(() => data.value || []);

    return {
      items,
    };
  },
});
</script>
