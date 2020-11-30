<template>
  <div class="shadow-lg max-w-md m-6 bg-white">
    <div class="p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-gray-900 font-bold text-2xl">
          <RouterLink :to="`/product/${product.id}`">
            {{ product.name }}
          </RouterLink>
        </h2>
        <p class="mt-2 text-gray-600 text-sm">{{ product.description }}</p>
      </div>
      <div class="flex item-center justify-between mt-3">
        <span class="text-gray-700 font-bold text-xl">${{ product.price }}</span>
        <ProductAddToCart :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from '@/plugins/api';
import { useStore } from '@/plugins/pinia';
import { defineComponent } from 'vue';
import ProductAddToCart from './ProductAddToCart.vue';

export default defineComponent({
  components: {
    ProductAddToCart,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    function onAddToCart() {
      return store.addProduct(props.product as Product);
    }

    return {
      onAddToCart,
    };
  },
});
</script>
