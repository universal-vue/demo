<template>
  <button
    :disabled="disabledDecrement"
    class="btn btn-small disabled:cursor-not-allowed disabled:opacity-25"
    @click="decrement"
  >
    -
  </button>
  <span class="px-2">{{ row.qty }}</span>
  <button class="btn btn-small" @click="increment">+</button>
</template>

<script lang="ts">
import { CartRow, useStore } from '@/plugins/pinia';
import { computed, defineComponent, PropType } from 'vue';

interface Props {
  row: CartRow;
}

export default defineComponent({
  props: {
    row: {
      type: Object as PropType<CartRow>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    function increment() {
      store.addProduct(props.row.product);
    }

    function decrement() {
      store.removeProduct(props.row.product, 1);
    }

    const disabledDecrement = computed(() => props.row.qty === 1);

    return {
      increment,
      decrement,
      disabledDecrement,
    };
  },
});
</script>
