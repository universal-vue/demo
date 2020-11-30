<template>
  <div class="app">
    <Head>
      <title>UVue</title>
    </Head>
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import { Head } from '@egoist/vue-head';

export default defineComponent({
  components: {
    DefaultLayout,
    Head,
  },
});
</script>
