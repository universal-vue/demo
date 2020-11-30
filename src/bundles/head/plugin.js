/* eslint-disable @typescript-eslint/no-var-requires */
const { createHead } = require('@egoist/vue-head');
const { definePlugin } = require('@uvue/core');

module.exports = definePlugin(({ app }) => {
  const head = createHead();
  app.use(head);
});
