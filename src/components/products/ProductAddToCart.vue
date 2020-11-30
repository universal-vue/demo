<template>
  <span>
    <button class="px-3 py-2 bg-gray-200 text-xs font-bold uppercase rounded" @click="onAddToCart">
      Add to Card
    </button>
  </span>
</template>

<script lang="ts">
import { Product } from '@/plugins/api';
import { useStore } from '@/plugins/pinia';
import { defineComponent } from 'vue';

export default defineComponent({
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
