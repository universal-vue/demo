<template>
  <div class="container mx-auto">
    <h1 class="text-left text-4xl m-6 font-bold">Cart</h1>

    <template v-if="rows.length">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                >
                  Quantity
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                >
                  Price
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                >
                  Total
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                ></th>
              </tr>
            </thead>
            <tbody>
              <CartRow v-for="row in rows" :key="row.product.id" :row="row" />
              <tr>
                <td
                  colspan="3"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                ></td>
                <td
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Sub-total
                </td>
                <td
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                ></td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                ></td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  ${{ subTotal }}
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center">
        <div class="p-5">
          No products in your cart!
        </div>
        <RouterLink to="/" class="btn btn-blue">
          Go to products
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import CartRow from '@/components/cart/CartRow.vue';
import { useStore } from '@/plugins/pinia';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: { CartRow },
  setup() {
    const store = useStore();

    const subTotal = computed(() => {
      return store.cart
        .reduce((price, row) => {
          return price + row.qty * row.product.price;
        }, 0)
        .toFixed(2);
    });

    return {
      rows: store.cart,
      subTotal,
    };
  },
});
</script>
