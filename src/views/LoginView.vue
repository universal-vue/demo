<template>
  <div class="container mx-auto">
    <h1 class="text-4xl m-6 font-bold text-center">Login</h1>

    <div v-if="error" class="text-center">
      An error occurred:
      <pre>{{ error }}</pre>
    </div>

    <div v-if="loading" class="text-center">
      Loading...
    </div>

    <template v-else>
      <form novalidate @submit.prevent="onSubmit" class="w-64 mx-auto">
        <label class="block">
          <div class="m-2">Email:</div>
          <input
            type="email"
            v-model="values.email"
            placeholder="example@domain.com"
            class="p-2 m-2"
          />
        </label>
        <button type="submit" class="btn btn-blue m-2">Login</button>
      </form>
    </template>
  </div>
</template>

<script lang="ts">
import { useApi } from '@/plugins/api';
import { useGlobalState } from '@/plugins/globalState';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const api = useApi();
    const globalState = useGlobalState();
    const router = useRouter();

    const loading = ref(false);
    const error = ref<string | Error | null>(null);
    const values = reactive({
      email: '',
    });

    async function onSubmit() {
      error.value = null;
      if (values.email.trim().length === 0) {
        error.value = 'Please enter an email address!';
        return;
      }

      loading.value = true;
      try {
        globalState.user = await api.login(values);
        router.push('/profile');
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    }

    return {
      values,
      onSubmit,
      error,
      loading,
    };
  },
});
</script>
