import { useContext } from '@uvue/core';

export function useConfig() {
  const context = useContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return context.$config as Record<string, any>;
}
