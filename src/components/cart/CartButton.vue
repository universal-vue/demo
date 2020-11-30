<template>
  <RouterLink to="/cart"> Cart ({{ productsCount }}) </RouterLink>
</template>

<script lang="ts">
import { useStore } from '@/plugins/pinia';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const store = useStore();

    const productsCount = computed(() => store.cart.length);

    return {
      productsCount,
    };
  },
});
</script>
