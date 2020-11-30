<template>
  <div v-if="product" class="container mx-auto p-10">
    <div class="md:flex">
      <img
        :src="product.picture"
        :alt="product.name"
        class="w-auto md:w-1/3 mx-auto h-auto object-cover"
      />
      <div class="px-5 flex flex-col w-auto md:w-2/3">
        <div>
          <h1 class="text-4xl mb-6 font-bold">{{ product.name }}</h1>
          <p>{{ product.description }}</p>
        </div>

        <div class="flex item-center justify-between mt-3">
          <span class="text-gray-700 font-bold text-xl">${{ product.price }}</span>
          <ProductAddToCart :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouteData } from '@uvue/core/plugins/routeData';
import { defineComponent } from 'vue';
import ProductAddToCart from '@/components/products/ProductAddToCart.vue';
import { Product } from '@/plugins/api';

export default defineComponent({
  components: {
    ProductAddToCart,
  },

  routeData({ $api }, { params }) {
    return $api.getProduct(params.id as string);
  },

  setup() {
    return {
      product: useRouteData<Product>(),
    };
  },
});
</script>
