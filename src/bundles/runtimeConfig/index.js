/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { defineBundle } = require('@uvue/service');

module.exports = defineBundle(({ addPlugin, addServerPlugin }, options, projectConfig) => {
  addPlugin(path.join(__dirname, 'plugin.js'), {});
  addServerPlugin(path.join(__dirname, 'server.js'), { projectConfig });
});
