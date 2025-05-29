const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 👈 THIS IS IMPORTANT
  transpileDependencies: true
})
