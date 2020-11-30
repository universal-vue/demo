import { getDataFromSSR, useContext, Context, PluginInject } from '@uvue/core';
import { reactive } from 'vue';

export interface GlobalState {
  user: {
    email: string;
    status?: string;
  } | null;
}

export default async function({ data, isServer, $api }: Context, inject: PluginInject) {
  // Create state
  let state = reactive<GlobalState>({
    user: null,
  });

  // Execute function on http request
  if (isServer) {
    try {
      state.user = await $api.getProfile();
    } catch (err) {
      // Silent error
    }
  }

  if (isServer) {
    data.$globalState = state;
  } else {
    const serverData = getDataFromSSR();
    if (serverData.$globalState) {
      state = reactive<GlobalState>(serverData.$globalState);
      delete serverData.$globalState;
    }
  }

  inject('globalState', state);
}

export function useGlobalState() {
  const { $globalState } = useContext();
  return $globalState;
}
