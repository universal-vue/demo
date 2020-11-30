/* eslint-disable @typescript-eslint/no-var-requires */
const devalue = require('@nuxtjs/devalue');
const { onRunnerBeforeRender, onRendererData, defineServerPlugin } = require('@uvue/service');

module.exports = defineServerPlugin((options, projectConfig) => {
  const cfg = projectConfig.runtimeConfig || {};

  onRunnerBeforeRender(context => {
    context.runtimeConfig = {
      ...(cfg.public || {}),
      ...(cfg.private || {}),
    };
  });

  onRendererData(() => {
    return `<script>window._UVUE_CONFIG_=${devalue(cfg.public || {})};</script>`;
  });
});
