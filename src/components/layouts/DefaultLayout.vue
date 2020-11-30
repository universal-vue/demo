<template>
  <div>
    <MainHeader />
    <main class="pb-32">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from '../MainHeader.vue';
import MainFooter from '../MainFooter.vue';

export default defineComponent({
  components: {
    MainHeader,
    MainFooter,
  },
});
</script>
