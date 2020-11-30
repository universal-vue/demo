<template>
  <header class="bg-gray-300 body-font shadow w-full">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div class="inner">
        <RouterLink
          to="/"
          class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold block"
        >
          UVue
        </RouterLink>
      </div>

      <MainMenu />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainMenu from './MainMenu.vue';

export default defineComponent({
  components: {
    MainMenu,
  },
});
</script>
