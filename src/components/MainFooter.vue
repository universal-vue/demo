<template>
  <footer class="bg-gray-300 p-5 mt-5 fixed bottom-0 left-0 right-0 z-0">
    <div class="container mx-auto text-center text-xs">
      <template v-if="user"> Logged as: {{ user.email }} </template>

      <template v-else>
        You are not logged
      </template>
    </div>
  </footer>
</template>

<script lang="ts">
import { useGlobalState } from '@/plugins/globalState';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const globalState = useGlobalState();
    const user = computed(() => globalState.user);

    return {
      user,
    };
  },
});
</script>
