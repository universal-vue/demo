/* eslint-disable @typescript-eslint/no-var-requires */
const { onRendererHead, defineServerPlugin } = require('@uvue/service');
const { h, Fragment } = require('vue');
const { renderToString } = require('@vue/server-renderer');

module.exports = defineServerPlugin(() => {
  onRendererHead(({ app }) => {
    const { headTags } = app._context.provides['__head__'];
    return renderToString(h(Fragment, headTags));
  });
});
