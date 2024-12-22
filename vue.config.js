const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//github page
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/huangdu-game/'
    : '/'
}