<template>
  <div class="container mx-auto">
    <h1 v-if="user" class="text-center text-4xl m-6 font-bold">Welcome {{ user.email }}</h1>
    <div class="text-center">
      <button @click="onLogout" class="btn btn-blue">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useApi } from '@/plugins/api';
import { useGlobalState } from '@/plugins/globalState';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const globalState = useGlobalState();
    const api = useApi();
    const router = useRouter();

    const user = computed(() => globalState.user);

    async function onLogout() {
      await api.logout();
      globalState.user = null;
      router.push('/');
    }

    return {
      user,
      onLogout,
    };
  },
});
</script>
