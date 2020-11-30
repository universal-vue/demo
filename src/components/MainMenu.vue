<template>
  <nav class="flex lg:w-2/5 flex-wrap justify-end text-base md:ml-auto">
    <RouterLink
      to="/"
      class="ml-5 cursor-pointer border-b border-transparent hover:border-indigo-600"
    >
      Products
    </RouterLink>
    <RouterLink
      to="/profile"
      class="ml-5 cursor-pointer border-b border-transparent hover:border-indigo-600"
    >
      My profile
    </RouterLink>
    <CartButton class="ml-5 cursor-pointer border-b border-transparent hover:border-indigo-600" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CartButton from './cart/CartButton.vue';

export default defineComponent({
  components: {
    CartButton,
  },
});
</script>
