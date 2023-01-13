// vue.config.js
module.exports = {
  // ... other config
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "@/scss/common.scss";`
        },
      },
    },
    // ... other config
  }
