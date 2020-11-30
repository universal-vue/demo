import { Context } from '@uvue/core';

export function isLogged(context: Context) {
  const { $globalState, redirect, router } = context;
  const isLogged = !!$globalState.user?.email;

  if (router) {
    if (!isLogged) {
      redirect({
        path: '/login',
      });
    }
  }
}

export function isAnonymous(context: Context) {
  const { $globalState, redirect, router } = context;
  const isLogged = !!$globalState.user?.email;

  if (router) {
    if (isLogged) {
      redirect({
        path: '/profile',
      });
    }
  }
}
