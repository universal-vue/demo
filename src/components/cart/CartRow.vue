<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-6/12">
      {{ product.name }}
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center w-2/12">
      <CartRowQuantity :row="row" />
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center w-2/12">
      ${{ product.price }}
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center w-2/12">
      ${{ total }}
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
      <CartRowRemove :product="product" />
    </td>
  </tr>
</template>

<script lang="ts">
import { CartRow } from '@/plugins/pinia';
import { computed, defineComponent, PropType } from 'vue';
import CartRowQuantity from './CartRowQuantity.vue';
import CartRowRemove from './CartRowRemove.vue';

interface Props {
  row: CartRow;
}

export default defineComponent({
  components: { CartRowQuantity, CartRowRemove },
  props: {
    row: {
      type: Object as PropType<CartRow>,
      required: true,
    },
  },

  setup(props) {
    const product = computed(() => props.row.product);

    const total = computed(() => (props.row.qty * product.value.price).toFixed(2));

    return {
      product,
      total,
    };
  },
});
</script>
