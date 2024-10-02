import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  runner: {
    startUrls: ["https://www.linkedin.com"],
  },
  manifest: {
    // author: 'roshan', 
    action: {
      default_popup: 'popup.html',
      default_icon: { 16: 'icon/16.png' },
    },
    permissions: ['activeTab', 'declarativeContent', 'storage'],
  },
});
