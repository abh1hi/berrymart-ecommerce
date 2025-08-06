/* frontend/vue.config.js */
// This file is used to configure the Vue CLI development server.
// We'll use it to proxy API requests to our backend.
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    // Proxy API requests to the backend container
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
