<template>
  <button class="btn btn-small" @click="removeRow">
    Delete
  </button>
</template>

<script lang="ts">
import { Product } from '@/plugins/api';
import { useStore } from '@/plugins/pinia';
import { defineComponent, PropType } from 'vue';

interface Props {
  product: Product;
}

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    function removeRow() {
      store.removeProduct(props.product);
    }

    return {
      removeRow,
    };
  },
});
</script>
