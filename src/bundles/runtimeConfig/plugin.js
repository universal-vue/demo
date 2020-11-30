/* eslint-disable @typescript-eslint/no-var-requires */
const { definePlugin } = require('@uvue/core');

module.exports = definePlugin(({ isClient, runtimeConfig }, inject) => {
  if (isClient) {
    runtimeConfig = window._UVUE_CONFIG_;
  }
  inject('config', runtimeConfig || {});
});
