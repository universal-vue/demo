module.exports = {
  plugins: [
    // Plugins
    '@uvue/core/plugins/middlewares',
    '@uvue/core/plugins/routeData',
    // App plugins
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/pinia',
    '@/plugins/globalState',
  ],
  bundles: ['./src/bundles/head', './src/bundles/runtimeConfig'],
  build: {
    css: {
      vue: 'extract',
      normal: 'extract',
    },
    dev: {
      watch: ['uvue.config.js', 'server/**/*', 'src/bundles/**/*'],
    },
  },
  server: {
    setup: './server',
  },

  runtimeConfig: {
    public: {
      apiUrl: '/',
    },
    private: {
      apiUrl: 'http://localhost:8080',
    },
  },
};
