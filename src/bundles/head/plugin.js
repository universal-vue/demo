/* eslint-disable @typescript-eslint/no-var-requires */
const { createHead } = require('@egoist/vue-head');
const { definePlugin } = require('@uvue/core');

console.log('head require');
module.exports = function headSetup({ app }) {
  console.log('head');
  const head = createHead();
  app.use(head);
};
